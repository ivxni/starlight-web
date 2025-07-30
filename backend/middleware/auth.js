const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');

// Middleware to authenticate JWT tokens
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        code: 'TOKEN_MISSING'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(403).json({ 
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Check if user is banned
    if (user.isBanned) {
      return res.status(403).json({ 
        error: 'Account suspended',
        code: 'ACCOUNT_BANNED',
        reason: user.banReason
      });
    }

    // Update last used
    user.lastUsed = new Date();
    await user.save();

    req.user = user;
    req.token = decoded;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid token',
        code: 'TOKEN_INVALID'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
};

// Log user activity
const logActivity = (action) => {
  return async (req, res, next) => {
    try {
      if (req.user) {
        await ActivityLog.create({
          userId: req.user._id,
          action: action,
          userAgent: req.get('User-Agent'),
          ipAddress: req.ip,
          details: req.activityDetails || {}
        });
      }
    } catch (error) {
      console.error('Activity logging error:', error);
      // Don't fail the request if logging fails
    }
    next();
  };
};

// Check subscription status
const checkSubscription = (requiredLevel = 'free') => {
  return (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check subscription level
    if (requiredLevel === 'premium' && user.subscriptionStatus !== 'premium') {
      return res.status(403).json({ 
        error: 'Premium subscription required',
        code: 'SUBSCRIPTION_REQUIRED',
        currentPlan: user.subscriptionStatus
      });
    }

    // Check if subscription is expired
    if (user.subscriptionStatus === 'premium' && user.subscriptionExpiresAt < new Date()) {
      user.subscriptionStatus = 'expired';
      user.save(); // Fire and forget
      
      return res.status(403).json({ 
        error: 'Subscription expired',
        code: 'SUBSCRIPTION_EXPIRED',
        expiredAt: user.subscriptionExpiresAt
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  logActivity,
  checkSubscription
};