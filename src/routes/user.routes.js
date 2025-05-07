/**
 * User routes
 * @module routes/user
 */

import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router();

/**
 * @route GET /api/users
 * @desc Get all users (admin only)
 * @access Private
 */
router.get('/', UserController.getAllUsers);

/**
 * @route POST /api/users
 * @desc Create a new user
 * @access Public
 */
router.post('/', UserController.createUser);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Private
 */
router.get('/:id', UserController.getUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update user
 * @access Private
 */
router.put('/:id', UserController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @desc Delete user
 * @access Private
 */
router.delete('/:id', UserController.deleteUser);

export default router;
