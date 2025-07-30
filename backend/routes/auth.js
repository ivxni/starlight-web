const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Configuration = require('../models/Configuration');
const ActivityLog = require('../models/ActivityLog');

const router = express.Router();

// Discord OAuth configuration
const DISCORD_CONFIG = {
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  redirectUri: process.env.DISCORD_REDIRECT_URI,
  scope: ['identify', 'email'].join(' ')
};

// Generate Discord OAuth URL
router.get('/discord', (req, res) => {
  // Check if Discord OAuth is properly configured
  if (!DISCORD_CONFIG.clientId || !DISCORD_CONFIG.clientSecret) {
    return res.status(500).json({
      error: 'Discord OAuth not configured',
      message: 'Please set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in your .env file',
      setup_guide: 'Visit https://discord.com/developers/applications to create a Discord app'
    });
  }

  const state = uuidv4(); // CSRF protection
  
  // Manually construct Discord OAuth URL
  const authUrl = `https://discord.com/api/oauth2/authorize?` +
    `client_id=${DISCORD_CONFIG.clientId}&` +
    `redirect_uri=${encodeURIComponent(DISCORD_CONFIG.redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(DISCORD_CONFIG.scope)}&` +
    `state=${state}`;

  // In production, you should store the state in session/cache
  res.redirect(authUrl);
});

// Handle Discord OAuth callback
router.post('/discord/callback', async (req, res) => {
  const { code, state } = req.body;
  
  if (!code) {
    return res.status(400).json({ 
      error: 'Authorization code is required',
      code: 'MISSING_CODE'
    });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: DISCORD_CONFIG.clientId,
      client_secret: DISCORD_CONFIG.clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: DISCORD_CONFIG.redirectUri
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user info from Discord
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const discordUser = userResponse.data;

    // Find or create user in database
    let user = await User.findOne({ discordId: discordUser.id });
    
    if (!user) {
      user = new User({
        uuid: uuidv4(),
        discordId: discordUser.id,
        username: discordUser.username,
        discriminator: discordUser.discriminator || '0',
        avatar: discordUser.avatar,
        email: discordUser.email,
        discordAccessToken: access_token,
        discordRefreshToken: refresh_token,
        tokenExpiresAt: new Date(Date.now() + (expires_in * 1000))
      });
    } else {
      // Update existing user
      user.username = discordUser.username;
      user.discriminator = discordUser.discriminator || '0';
      user.avatar = discordUser.avatar;
      user.email = discordUser.email;
      user.discordAccessToken = access_token;
      user.discordRefreshToken = refresh_token;
      user.tokenExpiresAt = new Date(Date.now() + (expires_in * 1000));
      user.lastUsed = new Date();
    }

    await user.save();

    // Create default configuration if it doesn't exist
    let config = await Configuration.findOne({ userId: user._id });
    if (!config) {
      config = new Configuration({
        userId: user._id,
        priorities: [
          { priority: 1, agent: 'Select Agent' },
          { priority: 2, agent: 'Select Agent' },
          { priority: 3, agent: 'Select Agent' },
          { priority: 4, agent: 'Select Agent' }
        ]
      });
      await config.save();
    }

    // Log login activity
    await ActivityLog.create({
      userId: user._id,
      action: 'login',
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip
    });

    // Create JWT token
    const token = jwt.sign(
      { 
        sub: user._id,
        uuid: user.uuid,
        discordId: user.discordId,
        username: user.username
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: process.env.JWT_EXPIRY || '7d',
        issuer: 'starlight-backend',
        audience: 'starlight-frontend'
      }
    );

    res.json({ 
      success: true,
      token, 
      user: {
        uuid: user.uuid,
        username: user.username,
        discriminator: user.discriminator,
        avatar: user.avatar,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    console.error('Discord OAuth error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      return res.status(400).json({ 
        error: 'Invalid authorization code',
        code: 'INVALID_CODE'
      });
    }
    
    res.status(500).json({ 
      error: 'Discord authentication failed',
      code: 'DISCORD_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Refresh Discord token
router.post('/discord/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: DISCORD_CONFIG.clientId,
      client_secret: DISCORD_CONFIG.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    res.json({
      access_token,
      refresh_token,
      expires_in
    });

  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(400).json({ 
      error: 'Failed to refresh token',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;