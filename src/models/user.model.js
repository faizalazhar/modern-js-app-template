/**
 * User model
 * @module models/user
 */

/**
 * User entity class
 */
export class User {
  /**
   * Create a new User instance
   * @param {Object} userData - User data
   * @param {string} userData.id - User ID
   * @param {string} userData.email - User email
   * @param {string} userData.username - Username
   * @param {string} userData.password - Hashed password
   * @param {string} userData.firstName - First name
   * @param {string} userData.lastName - Last name
   * @param {string} userData.role - User role
   * @param {Date} userData.createdAt - Creation date
   * @param {Date} userData.updatedAt - Last update date
   */
  constructor({
    id = null,
    email,
    username,
    password,
    firstName = '',
    lastName = '',
    role = 'user',
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password; // Should be already hashed
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Get user's full name
   * @returns {string} Full name
   */
  get fullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Get user object without sensitive data
   * @returns {Object} Safe user object
   */
  toSafeObject() {
    /* eslint-disable no-unused-vars */

    const { password, ...safeUser } = this;

    /* eslint-enable no-unused-vars */
    return safeUser;
  }

  /**
   * Convert User to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return this.toSafeObject();
  }
}

export default User;
