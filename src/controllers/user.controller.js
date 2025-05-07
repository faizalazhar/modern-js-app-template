/**
 * User controller
 * @module controllers/user
 */

import { UserService } from '../services/user.service.js';
import { ApiError } from '../middleware/error.middleware.js';
import { logger } from '../config/logger.js';

/**
 * User controller for handling user-related HTTP requests
 */
export class UserController {
  /**
   * Create a new user
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next middleware
   */
  static async createUser(req, res, next) {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);

      logger.info(`User created: ${user.id}`);

      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next middleware
   */
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user by ID
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next middleware
   */
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Ensure user has permission to update this profile
      if (req.user?.id !== id && req.user?.role !== 'admin') {
        throw new ApiError('Unauthorized', 403);
      }

      const user = await UserService.updateUser(id, updates);

      logger.info(`User updated: ${id}`);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user by ID
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next middleware
   */
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Ensure user has permission to delete this profile
      if (req.user?.id !== id && req.user?.role !== 'admin') {
        throw new ApiError('Unauthorized', 403);
      }

      await UserService.deleteUser(id);

      logger.info(`User deleted: ${id}`);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all users (with pagination)
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   * @param {Function} next - Express next middleware
   */
  static async getAllUsers(req, res, next) {
    try {
      // Ensure user has permission to list users
      if (req.user?.role !== 'admin') {
        throw new ApiError('Unauthorized', 403);
      }

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await UserService.getAllUsers({ page, limit });

      res.status(200).json({
        success: true,
        data: result.users,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
