const mongoose = require('mongoose');

const prioritySchema = new mongoose.Schema({
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  agent: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const configurationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Agent priorities
  priorities: [prioritySchema],
  
  // System settings
  settings: {
    autoStart: {
      type: Boolean,
      default: false
    },
    notifications: {
      type: Boolean,
      default: true
    },
    soundEnabled: {
      type: Boolean,
      default: true
    },
    delayMs: {
      type: Number,
      default: 50,
      min: 10,
      max: 1000
    },
    retryAttempts: {
      type: Number,
      default: 3,
      min: 1,
      max: 10
    }
  },
  
  // Usage statistics
  totalSelections: {
    type: Number,
    default: 0
  },
  successfulSelections: {
    type: Number,
    default: 0
  },
  lastUsed: Date,
  
  // Configuration status
  isActive: {
    type: Boolean,
    default: false
  }
  
}, {
  timestamps: true
});

// Indexes are defined in the schema fields with unique: true
// No need for separate index definitions

// Virtual for success rate
configurationSchema.virtual('successRate').get(function() {
  if (this.totalSelections === 0) return 0;
  return Math.round((this.successfulSelections / this.totalSelections) * 100);
});

// Ensure priorities are properly ordered
configurationSchema.pre('save', function(next) {
  if (this.priorities && this.priorities.length > 0) {
    this.priorities.sort((a, b) => a.priority - b.priority);
  }
  next();
});

module.exports = mongoose.model('Configuration', configurationSchema);