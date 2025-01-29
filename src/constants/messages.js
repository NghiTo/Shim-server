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
    USER_EXISTS: "Email already exists.",
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
    PASSWORD_INVALID: "Invalid password.",
    PASSWORD_MISMATCH: "Passwords do not match.",
    PASSWORD_UPDATE_SUCCESS: "Password updated.",
    OTP_INVALID: "Invalid OTP",
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
  },

  TEACHER: {
    CREATE_SUCCESS: "Teacher created successfully.",
    CREATE_FAILURE: "Failed to create teacher.",
    NOT_FOUND: "Teacher not found.",
    FIND_SUCCESS: "Teacher found successfully.",
    UPDATE_SUCCESS: "Teacher updated successfully.",
    UPDATE_FAILURE: "Failed to update teacher.",
    DELETE_SUCCESS: "Teacher deleted successfully.",
    DELETE_FAILURE: "Failed to delete teacher.",
  },
  QUIZ: {
    CREATE_SUCCESS: "Quiz created successfully.",
    CREATE_FAILURE: "Failed to create quiz.",
    ATTEMPT_CREATE_SUCCESS: "Attempt quiz created successfully.",
    NOT_FOUND: "Quiz not found.",
    FIND_SUCCESS: "Quiz found successfully.",
    UPDATE_SUCCESS: "Quiz updated successfully.",
    DELETE_SUCCESS: "Quiz deleted successfully.",
    QUESTION_NOT_FOUND: "Question not found.",
    QUESTION_DELETE_SUCCESS: "Question deleted successfully",
    ANSWER_NOT_FOUND: "Answer not found.",
    SUMMARY_SUCCESS: "Summary successfully"
  },
  ANSWER: {
    CREATE_SUCCESS: "Answer created successfully",
  },
};

export default MESSAGES;
