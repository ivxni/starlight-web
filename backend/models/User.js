const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  // Unique user identifier
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  
  // Discord user data
  discordId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  discriminator: {
    type: String,
    default: '0'
  },
  avatar: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  
  // Authentication data
  discordAccessToken: {
    type: String,
    required: true
  },
  discordRefreshToken: String,
  tokenExpiresAt: Date,
  
  // Riot Games OAuth tokens (for Agent Locker)
  riotAccessToken: {
    type: String,
    select: false
  },
  riotRefreshToken: {
    type: String,
    select: false
  },
  riotIdToken: {
    type: String,
    select: false
  },
  riotTokenExpiresAt: {
    type: Date
  },
  riotSubject: {
    type: String
  },
  
  // User preferences
  isActive: {
    type: Boolean,
    default: false
  },
  
  // Subscription data (for future use)
  subscriptionStatus: {
    type: String,
    enum: ['free', 'premium', 'expired'],
    default: 'free'
  },
  subscriptionExpiresAt: Date,
  
  // Usage statistics
  totalUsage: {
    type: Number,
    default: 0
  },
  lastUsed: Date,
  
  // Account status
  isBanned: {
    type: Boolean,
    default: false
  },
  banReason: String,
  
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.discordAccessToken;
      delete ret.discordRefreshToken;
      return ret;
    }
  }
});

// Indexes are defined in the schema fields with index: true
// No need for separate index definitions

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.discriminator !== '0' ? `${this.username}#${this.discriminator}` : this.username;
});

// Virtual for Discord avatar URL
userSchema.virtual('avatarUrl').get(function() {
  if (this.avatar) {
    return `https://cdn.discordapp.com/avatars/${this.discordId}/${this.avatar}.png`;
  }
  return `https://cdn.discordapp.com/embed/avatars/${parseInt(this.discriminator) % 5}.png`;
});

module.exports = mongoose.model('User', userSchema);