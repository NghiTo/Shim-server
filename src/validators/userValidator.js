import { celebrate, Joi, Segments } from "celebrate";

const emailValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
  }),
});

const passwordValidation = celebrate({
  [Segments.BODY]: Joi.object({
    oldPassword: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
    newPassword: Joi.string().min(6).max(32).required().messages({
      "string.base": "Password must be of type string",
      "string.min": "Password length must be from 6 to 32 characters",
      "string.max": "Password length must be from 6 to 32 characters",
      "string.empty": "Password is a required field",
      "any.required": "Password is a required field",
    }),
  }),
});

const registerValidation = celebrate({
  [Segments.BODY]: Joi.object({
    firstName: Joi.string().required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is a required field",
      "any.required": "First name is a required field",
    }),
    lastName: Joi.string().required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is a required field",
      "any.required": "Last name is a required field",
    }),
    title: Joi.string().required().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is a required field",
      "any.required": "Title is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email must be of type string",
      "string.email": "Invalid email",
      "string.empty": "Email is a required field",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().min(6).required().messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is a required field",
      "string.min": "Password should be at least 6 characters long",
      "any.required": "Password is a required field",
    }),
    role: Joi.string()
      .valid("admin", "student", "teacher")
      .optional()
      .messages({
        "string.base": "Role must be a string",
        "any.only": "Role must be either 'admin' or 'student' or 'teacher'.",
      }),
    avatarUrl: Joi.string().uri().optional().messages({
      "string.uri": "Avatar URL must be a valid URI",
    }),
    schoolId: Joi.string().optional().allow(null),
    subject: Joi.string().optional().allow(""),
    grade: Joi.string().optional().allow(""),
  }),
});

export default {
  emailValidation,
  loginValidation,
  passwordValidation,
  registerValidation,
};
