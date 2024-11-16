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
    TOKEN_EXPIRED: "Token expired.",
    TOKEN_INVALID: "Invalid token.",
  },

  SCHOOL: {
    CREATE_SUCCESS: "School created successfully.",
    CREATE_FAILURE: "Failed to create school.",
    NOT_FOUND: "School not found.",
    FIND_SUCCESS: "School found successfully.",
    UPDATE_SUCCESS: "School updated successfully.",
    UPDATE_FAILURE: "Failed to update school.",
    DELETE_SUCCESS: "School deleted successfully.",
    DELETE_FAILURE: "Failed to delete school.",
  }
};

export default MESSAGES;
