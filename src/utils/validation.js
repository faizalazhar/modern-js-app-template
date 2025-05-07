/**
 * Validation utilities
 * @module utils/validation
 */

/**
 * Email validation pattern
 * @type {RegExp}
 */
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Password validation pattern (min 8 chars, at least one letter and one number)
 * @type {RegExp}
 */
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_PATTERN.test(email);
};

/**
 * Validates a password
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  return PASSWORD_PATTERN.test(password);
};

/**
 * Validates a username
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid
 */
export const isValidUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  return username.length >= 3 && username.length <= 20;
};

/**
 * Create a validation schema
 * @param {Object} schema - Schema definition
 * @returns {Function} Validator function
 */
export const createValidator = (schema) => {
  return (data) => {
    const errors = {};

    for (const [field, validator] of Object.entries(schema)) {
      const { isValid, message } = validator(data[field]);

      if (!isValid) {
        errors[field] = message;
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
};

/**
 * Helper to create field validators
 * @param {Function} validateFn - Validation function
 * @param {string} errorMessage - Error message
 * @returns {Function} Field validator
 */
export const fieldValidator = (validateFn, errorMessage) => {
  return (value) => ({
    isValid: validateFn(value),
    message: errorMessage,
  });
};

export default {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  createValidator,
  fieldValidator,
};
