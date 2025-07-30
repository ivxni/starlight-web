// MongoDB initialization script
// This runs when the MongoDB container starts for the first time

db = db.getSiblingDB('starlight');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['riotId', 'gameName', 'tagLine', 'riotAccessToken'],
      properties: {
        riotId: {
          bsonType: 'string',
          description: 'Riot Games user ID - required'
        },
        gameName: {
          bsonType: 'string',
          description: 'Riot Games username - required'
        },
        tagLine: {
          bsonType: 'string',
          description: 'Riot Games tagline - required'
        },
        subscriptionStatus: {
          enum: ['free', 'premium', 'expired'],
          description: 'User subscription status'
        }
      }
    }
  }
});

db.createCollection('configurations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'priorities'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'Reference to user - required'
        },
        priorities: {
          bsonType: 'array',
          maxItems: 4,
          items: {
            bsonType: 'object',
            required: ['priority', 'agent'],
            properties: {
              priority: {
                bsonType: 'int',
                minimum: 1,
                maximum: 4
              },
              agent: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  }
});

db.createCollection('activitylogs', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'action'],
      properties: {
        userId: {
          bsonType: 'objectId',
          description: 'Reference to user - required'
        },
        action: {
          enum: ['system_started', 'system_stopped', 'agent_selected', 'selection_failed', 'config_updated', 'login', 'logout'],
          description: 'Type of action performed'
        }
      }
    }
  }
});

// Create indexes for better performance
db.users.createIndex({ 'riotId': 1 }, { unique: true });
db.users.createIndex({ 'gameName': 1, 'tagLine': 1 });
db.users.createIndex({ 'createdAt': -1 });

db.configurations.createIndex({ 'userId': 1 }, { unique: true });
db.configurations.createIndex({ 'isActive': 1 });

db.activitylogs.createIndex({ 'userId': 1, 'timestamp': -1 });
db.activitylogs.createIndex({ 'action': 1 });
db.activitylogs.createIndex({ 'timestamp': 1 }, { expireAfterSeconds: 2592000 }); // 30 days TTL

print('✅ MongoDB initialized with collections and indexes');
print('📊 Collections created: users, configurations, activitylogs');
print('🔍 Indexes created for optimal performance');
print('⏰ Activity logs will auto-delete after 30 days');