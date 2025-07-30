# STARLIGHT Backend

Backend service for STARLIGHT Agent Locker with MongoDB and Riot Games OAuth integration.

## Prerequisites

- Node.js 18+
- MongoDB 7.0+
- Riot Games Developer Account

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Fill in the required values:
- `MONGODB_URI`: MongoDB connection string
- `DISCORD_CLIENT_ID`: Your Discord OAuth Client ID
- `DISCORD_CLIENT_SECRET`: Your Discord OAuth Client Secret
- `JWT_SECRET`: Random secret for JWT tokens
- `JWT_EXPIRY`: Token expiration time (default: 7d)

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community  # macOS
# or follow instructions for your OS

# Start MongoDB
brew services start mongodb/brew/mongodb-community
```

**Option B: Docker Compose**
```bash
# Start MongoDB and backend together
docker-compose up -d
```

### 4. Getting Discord OAuth Credentials

To get Discord OAuth credentials:

a) Go to [Discord Developer Portal](https://discord.com/developers/applications)
b) Create a new application
c) Go to "OAuth2" section
d) Add redirect URI: `http://localhost:3000/auth/discord/callback`
e) Copy Client ID and Client Secret to your `.env` file

### 5. Initialize Database
```bash
# Seed database with sample data (optional)
npm run seed
```

### 6. Start Development Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `GET /auth/riot` - Initiate Riot OAuth flow
- `POST /auth/callback` - Handle OAuth callback

### User Data
- `GET /api/user` - Get current user info
- `GET /api/riot/account` - Get Riot account data

### Configuration
- `GET /api/config` - Get user configuration
- `POST /api/config` - Save user configuration

### Health
- `GET /health` - Health check endpoint

## Security Features

- Rate limiting (100 requests per 15 minutes)
- JWT token authentication
- CORS protection
- Input validation
- Error handling

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a proper database (PostgreSQL/MongoDB)
3. Implement session management
4. Add proper logging
5. Use HTTPS
6. Set up proper secrets management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RIOT_CLIENT_ID` | Riot OAuth Client ID | Yes |
| `RIOT_CLIENT_SECRET` | Riot OAuth Client Secret | Yes |
| `JWT_SECRET` | Secret for JWT tokens | Yes |
| `PORT` | Server port | No (default: 3001) |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: http://localhost:3000) |
| `NODE_ENV` | Environment (development/production) | No |