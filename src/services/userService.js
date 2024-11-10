import omit from "lodash/omit.js";
import userRepository from "../repositories/userRepository.js";

const createUser = async (data) => {
  const user = await userRepository.createUser(data);
  return {
    message: "User is created successfully",
    user: omit(user, ["password"]),
  };
};

const findUserByEmail = async ({email}) => {
  const user = await userRepository.findUserByEmail(email);
  return omit(user, ["password"]);
};

export default { createUser, findUserByEmail };
