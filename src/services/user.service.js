/**
 * User service
 * @module services/user
 */

import { User } from '../models/user.model.js';
import { ApiError } from '../middleware/error.middleware.js';

/**
 * Service for handling user-related operations
 */
export class UserService {
  /**
   * Simulate a database/data store for users
   * In a real app, this would be replaced with actual database access
   * @private
   */
  static #users = new Map();

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<User>} Created user
   * @throws {ApiError} If validation fails or user exists
   */
  static async createUser(userData) {
    // Validate user data
    if (!userData.email || !userData.username || !userData.password) {
      throw new ApiError('Email, username and password are required', 400);
    }

    // Check if user already exists
    const exists = Array.from(this.#users.values()).some(
      (user) =>
        user.email === userData.email || user.username === userData.username
    );

    if (exists) {
      throw new ApiError(
        'User with this email or username already exists',
        409
      );
    }

    // Generate a unique ID
    const id = crypto.randomUUID();

    // Create new user
    const user = new User({
      id,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save user
    this.#users.set(id, user);

    return user.toSafeObject();
  }

  /**
   * Get user by ID
   * @param {string} id - User ID
   * @returns {Promise<User>} User data
   * @throws {ApiError} If user not found
   */
  static async getUserById(id) {
    const user = this.#users.get(id);

    if (!user) {
      throw new ApiError(`User with ID ${id} not found`, 404);
    }

    return user.toSafeObject();
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise<User>} User data
   * @throws {ApiError} If user not found
   */
  static async getUserByEmail(email) {
    const user = Array.from(this.#users.values()).find(
      (u) => u.email === email
    );

    if (!user) {
      throw new ApiError(`User with email ${email} not found`, 404);
    }

    return user.toSafeObject();
  }

  /**
   * Update user by ID
   * @param {string} id - User ID
   * @param {Object} updates - User data to update
   * @returns {Promise<User>} Updated user
   * @throws {ApiError} If user not found or validation fails
   */
  static async updateUser(id, updates) {
    const user = this.#users.get(id);

    if (!user) {
      throw new ApiError(`User with ID ${id} not found`, 404);
    }

    /* eslint-disable no-unused-vars */

    // Prevent updating sensitive fields
    const { id: _, password: __, role: ___, ...safeUpdates } = updates;

    /* eslint-enable no-unused-vars */

    // Update user
    Object.assign(user, {
      ...safeUpdates,
      updatedAt: new Date(),
    });

    // Save user
    this.#users.set(id, user);

    return user.toSafeObject();
  }

  /**
   * Delete user by ID
   * @param {string} id - User ID
   * @returns {Promise<boolean>} True if deleted
   * @throws {ApiError} If user not found
   */
  static async deleteUser(id) {
    const exists = this.#users.has(id);

    if (!exists) {
      throw new ApiError(`User with ID ${id} not found`, 404);
    }

    return this.#users.delete(id);
  }

  /**
   * Get all users (with pagination)
   * @param {Object} options - Pagination options
   * @param {number} options.page - Page number
   * @param {number} options.limit - Items per page
   * @returns {Promise<{users: User[], total: number, page: number, limit: number}>} Paginated users
   */
  static async getAllUsers({ page = 1, limit = 10 } = {}) {
    const users = Array.from(this.#users.values());
    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      users: users.slice(start, end).map((user) => user.toSafeObject()),
      total: users.length,
      page,
      limit,
    };
  }
}

export default UserService;
