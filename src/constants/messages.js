const MESSAGES = {
  // User-related messages
  USER: {
    CREATE_SUCCESS: "User created successfully.",
    CREATE_FAILURE: "Failed to create user.",
    NOT_FOUND: "User not found.",
    FIND_SUCCESS: "User found successfully.",
    UPDATE_SUCCESS: "User updated successfully.",
    UPDATE_FAILURE: "Failed to update user.",
    DELETE_SUCCESS: "User deleted successfully.",
    DELETE_FAILURE: "Failed to delete user.",
  },

  // Authentication messages
  AUTH: {
    LOGIN_SUCCESS: "Login successful.",
    LOGIN_FAILURE: "Invalid email or password.",
    UNAUTHORIZED: "Unauthorized access.",
    FORBIDDEN: "Forbidden. You do not have permission to access this resource.",
    LOGOUT_SUCCESS: "Logout successful.",
  },

  // Validation messages
  VALIDATION: {
    REQUIRED_FIELD: (field) => `${field} is required.`,
    INVALID_EMAIL: "The email format is invalid.",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters long.",
    PASSWORD_TOO_WEAK:
      "Password must contain a mix of letters, numbers, and symbols.",
    INVALID_REQUEST: "Invalid request data.",
  },

  // General messages
  GENERAL: {
    SUCCESS: "Operation completed successfully.",
    FAILURE: "Operation failed. Please try again.",
    NOT_FOUND: "Resource not found.",
    SERVER_ERROR: "An error occurred on the server. Please try again later.",
    BAD_REQUEST: "Bad request.",
    UNPROCESSABLE_ENTITY: "The request could not be processed.",
  },

  // Log messages
  LOG: {
    CREATE_SUCCESS: "Log created successfully.",
    CREATE_FAILURE: "Failed to create log.",
    UPDATE_SUCCESS: "Log updated successfully.",
    UPDATE_FAILURE: "Failed to update log.",
    DELETE_SUCCESS: "Log deleted successfully.",
    DELETE_FAILURE: "Failed to delete log.",
  },

  // Custom messages for specific use cases
  CUSTOM: {
    EMAIL_ALREADY_EXISTS: "This email is already in use.",
    EMAIL_SENT: "Email sent successfully.",
    EMAIL_SEND_FAILURE: "Failed to send email.",
    INVALID_TOKEN: "The provided token is invalid or expired.",
  },
};

export default MESSAGES;
