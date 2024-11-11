import { celebrate, Joi, Segments } from "celebrate";

const userValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email address",
      "any.required": "Email address is required",
    }),
  }),
});

export default userValidation;
