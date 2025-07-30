const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Activity details
  action: {
    type: String,
    required: true,
    enum: [
      'system_started',
      'system_stopped',
      'agent_selected',
      'selection_failed',
      'config_updated',
      'login',
      'logout'
    ]
  },
  
  // Additional data
  details: {
    agent: String,
    priority: Number,
    success: Boolean,
    errorMessage: String,
    responseTime: Number
  },
  
  // System information
  userAgent: String,
  ipAddress: String,
  
  // Metadata
  timestamp: {
    type: Date,
    default: Date.now
  }
  
}, {
  timestamps: true
});

// TTL Index - automatically delete logs older than 30 days
activityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);