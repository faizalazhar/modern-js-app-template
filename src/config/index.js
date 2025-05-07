/**
 * Configuration export module
 * @module config
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application configuration constants
 */
export const config = {
  app: {
    name: 'modern-js-app',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    apiPrefix: '/api',
    version: process.env.npm_package_version || '1.0.0',
  },

  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:8080',
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    saltRounds: 10,
  },

  db: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/modern-js-app',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

export default config;
