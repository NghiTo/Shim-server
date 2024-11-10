import omit from "lodash/omit.js";
import userRepository from "../repositories/userRepository.js";

const createUser = async (data) => {
  const user = await userRepository.createUser(data);
  return omit(user, ["password"]);
};

const findUserByEmail = async ({ email }) => {
  const user = await userRepository.findUserByEmail(email);
  if (user) return omit(user, ["password"]);
  return null;
};

export default { createUser, findUserByEmail };
