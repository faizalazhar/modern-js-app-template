/**
 * API routes
 * @module routes
 */

import { Router } from 'express';
import userRoutes from './user.routes.js';
import { config } from '../config/index.js';

const router = Router();

/**
 * Health check endpoint
 * @route GET /api/health
 * @returns {Object} Health status
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: config.app.version,
    environment: config.app.environment,
  });
});

// Mount routes
router.use('/users', userRoutes);

export default router;
