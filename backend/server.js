const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

// Import database and models
const database = require('./config/database');
const User = require('./models/User');
const Configuration = require('./models/Configuration');
const ActivityLog = require('./models/ActivityLog');

// Import middleware
const { authenticateToken, logActivity, checkSubscription } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
database.connect();

// Security middleware
app.use(helmet());
app.use(compression());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  }
});

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to API routes
app.use('/api', limiter);
app.use('/auth', limiter);

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/auth', authRoutes);

// Health check
app.get('/health', async (req, res) => {
  try {
    const dbStats = database.getStats();
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStats.connected,
        host: dbStats.host,
        name: dbStats.name
      },
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

// Get user data
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-discordAccessToken -discordRefreshToken');
    res.json({
      id: user._id,
      uuid: user.uuid,
      username: user.username,
      discriminator: user.discriminator,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      subscriptionStatus: user.subscriptionStatus,
      totalUsage: user.totalUsage,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Get user's Discord profile data (for dashboard features)
app.get('/api/discord/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const response = await axios.get(`${process.env.DISCORD_API_BASE}/users/@me`, {
      headers: {
        'Authorization': `Bearer ${user.discordAccessToken}`
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Discord API error:', error.response?.data || error.message);
    res.status(400).json({ 
      error: 'Failed to fetch Discord profile',
      details: error.response?.data || error.message
    });
  }
});

// Save user configuration
app.post('/api/config', authenticateToken, logActivity('config_updated'), async (req, res) => {
  try {
    const { priorities, settings } = req.body;
    
    if (!priorities || !Array.isArray(priorities)) {
      return res.status(400).json({ error: 'Invalid priorities format' });
    }

    // Validate priorities
    for (let i = 0; i < priorities.length; i++) {
      const priority = priorities[i];
      if (!priority.priority || priority.priority < 1 || priority.priority > 4) {
        return res.status(400).json({ error: `Invalid priority value: ${priority.priority}` });
      }
    }

    let config = await Configuration.findOne({ userId: req.user._id });
    
    if (!config) {
      config = new Configuration({
        userId: req.user._id,
        priorities: priorities.map(p => ({
          priority: p.priority || p.id,
          agent: p.agent,
          isActive: true
        })),
        settings: settings || {}
      });
    } else {
      config.priorities = priorities.map(p => ({
        priority: p.priority || p.id,
        agent: p.agent,
        isActive: true
      }));
      if (settings) {
        config.settings = { ...config.settings, ...settings };
      }
    }

    await config.save();

    res.json({ 
      success: true, 
      message: 'Configuration saved successfully',
      config: {
        priorities: config.priorities,
        settings: config.settings
      }
    });
  } catch (error) {
    console.error('Save config error:', error);
    res.status(500).json({ error: 'Failed to save configuration' });
  }
});

// Get user configuration
app.get('/api/config', authenticateToken, async (req, res) => {
  try {
    let config = await Configuration.findOne({ userId: req.user._id });
    
    if (!config) {
      // Create default configuration
      config = new Configuration({
        userId: req.user._id,
        priorities: [
          { priority: 1, agent: 'Select Agent' },
          { priority: 2, agent: 'Select Agent' },
          { priority: 3, agent: 'Select Agent' },
          { priority: 4, agent: 'Select Agent' }
        ]
      });
      await config.save();
    }

    res.json({
      priorities: config.priorities.map(p => ({
        id: p.priority,
        priority: p.priority,
        agent: p.agent,
        locked: false
      })),
      settings: config.settings,
      stats: {
        totalSelections: config.totalSelections,
        successfulSelections: config.successfulSelections,
        successRate: config.successRate
      }
    });
  } catch (error) {
    console.error('Get config error:', error);
    res.status(500).json({ error: 'Failed to fetch configuration' });
  }
});

// Toggle system status
app.post('/api/system/toggle', authenticateToken, async (req, res) => {
  try {
    const { isActive } = req.body;
    
    const config = await Configuration.findOne({ userId: req.user._id });
    if (!config) {
      return res.status(404).json({ error: 'Configuration not found' });
    }

    config.isActive = isActive;
    if (isActive) {
      config.lastUsed = new Date();
    }
    await config.save();

    // Log activity
    await ActivityLog.create({
      userId: req.user._id,
      action: isActive ? 'system_started' : 'system_stopped',
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip
    });

    res.json({ 
      success: true, 
      isActive: config.isActive,
      message: `System ${isActive ? 'started' : 'stopped'} successfully`
    });
  } catch (error) {
    console.error('Toggle system error:', error);
    res.status(500).json({ error: 'Failed to toggle system' });
  }
});

// Get activity logs
app.get('/api/logs', authenticateToken, async (req, res) => {
  try {
    const { limit = 50, skip = 0 } = req.query;
    
    const logs = await ActivityLog.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .select('-userId -userAgent -ipAddress');

    res.json({
      logs,
      total: await ActivityLog.countDocuments({ userId: req.user._id })
    });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Failed to fetch activity logs' });
  }
});

// Logout endpoint
app.post('/api/logout', authenticateToken, logActivity('logout'), async (req, res) => {
  try {
    // In a more advanced setup, you might want to blacklist the JWT token
    // For now, we'll just log the activity
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// Admin routes (for future use)
app.get('/api/admin/stats', authenticateToken, checkSubscription('premium'), async (req, res) => {
  try {
    // Basic stats - in production, you'd check if user is admin
    const userCount = await User.countDocuments();
    const activeConfigs = await Configuration.countDocuments({ isActive: true });
    const totalSelections = await Configuration.aggregate([
      { $group: { _id: null, total: { $sum: '$totalSelections' } } }
    ]);

    res.json({
      users: userCount,
      activeConfigs,
      totalSelections: totalSelections[0]?.total || 0
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 STARLIGHT Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Discord OAuth: http://localhost:${PORT}/auth/discord`);
  console.log(`🗄️  Database: ${process.env.MONGODB_URI}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await database.disconnect();
    process.exit(0);
  });
});

module.exports = app;