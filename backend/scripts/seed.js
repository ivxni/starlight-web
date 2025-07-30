const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Configuration = require('../models/Configuration');
const ActivityLog = require('../models/ActivityLog');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📡 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Configuration.deleteMany({});
    await ActivityLog.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create sample users
    const sampleUsers = [
      {
        riotId: 'sample-riot-id-1',
        gameName: 'TestUser1',
        tagLine: '1234',
        riotAccessToken: 'sample-token-1',
        subscriptionStatus: 'premium',
        totalUsage: 150
      },
      {
        riotId: 'sample-riot-id-2',
        gameName: 'TestUser2',
        tagLine: '5678',
        riotAccessToken: 'sample-token-2',
        subscriptionStatus: 'free',
        totalUsage: 45
      }
    ];

    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Created ${createdUsers.length} sample users`);

    // Create sample configurations
    const sampleConfigs = [
      {
        userId: createdUsers[0]._id,
        priorities: [
          { priority: 1, agent: 'Primary Option A', isActive: true },
          { priority: 2, agent: 'Secondary Option A', isActive: true },
          { priority: 3, agent: 'Support Option A', isActive: true },
          { priority: 4, agent: 'Tactical Option A', isActive: true }
        ],
        settings: {
          autoStart: true,
          notifications: true,
          soundEnabled: true,
          delayMs: 100
        },
        totalSelections: 89,
        successfulSelections: 85,
        isActive: true
      },
      {
        userId: createdUsers[1]._id,
        priorities: [
          { priority: 1, agent: 'Primary Option B', isActive: true },
          { priority: 2, agent: 'Secondary Option B', isActive: true },
          { priority: 3, agent: 'Select Agent', isActive: false },
          { priority: 4, agent: 'Select Agent', isActive: false }
        ],
        settings: {
          autoStart: false,
          notifications: true,
          soundEnabled: false,
          delayMs: 50
        },
        totalSelections: 23,
        successfulSelections: 21,
        isActive: false
      }
    ];

    const createdConfigs = await Configuration.insertMany(sampleConfigs);
    console.log(`⚙️  Created ${createdConfigs.length} sample configurations`);

    // Create sample activity logs
    const sampleLogs = [];
    
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];
      
      // Recent activities for each user
      const activities = [
        { action: 'login', details: {} },
        { action: 'config_updated', details: { agent: 'Primary Option A' } },
        { action: 'system_started', details: {} },
        { action: 'agent_selected', details: { agent: 'Primary Option A', success: true, responseTime: 45 } },
        { action: 'agent_selected', details: { agent: 'Primary Option A', success: true, responseTime: 52 } },
        { action: 'system_stopped', details: {} }
      ];

      activities.forEach((activity, index) => {
        sampleLogs.push({
          userId: user._id,
          action: activity.action,
          details: activity.details,
          userAgent: 'Mozilla/5.0 (Sample Browser)',
          ipAddress: '127.0.0.1',
          timestamp: new Date(Date.now() - (activities.length - index) * 3600000) // Spread over hours
        });
      });
    }

    const createdLogs = await ActivityLog.insertMany(sampleLogs);
    console.log(`📋 Created ${createdLogs.length} sample activity logs`);

    console.log('✅ Database seeded successfully!');
    console.log('\nSample Users:');
    createdUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.displayName} (${user.subscriptionStatus})`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run seeding
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;