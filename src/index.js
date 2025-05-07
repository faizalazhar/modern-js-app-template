/**
 * Application entry point
 * @module app
 */

import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { logger } from './config/logger.js';
import routes from './routes/index.js';
import {
  notFoundHandler,
  errorHandler,
} from './middleware/error.middleware.js';

// Create Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    methods: config.cors.allowedMethods,
    credentials: true,
  })
);

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
});

// Mount API routes
app.use(config.app.apiPrefix, routes);

// Handle 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = config.app.port;

app.listen(PORT, () => {
  logger.info(
    `Server running in ${config.app.environment} mode on port ${PORT}`
  );
  logger.info(`API available at ${config.app.apiPrefix}`);
});

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Perform graceful shutdown
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Perform graceful shutdown
  process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  // Close any resources (DB connections, etc.)
  process.exit(0);
});

export default app;
