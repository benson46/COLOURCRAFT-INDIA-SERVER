import { userRepository } from "../../repositories/usersRepository.js";

export const adminUserServices = {
  findAllUser: async () => {
    try {
      const users = await userRepository.findAllUserForAdmin();
      return users;
    } catch (error) {}
  },

  toogleUser: async (email) => {
    try {
      const user = await userRepository.findUserByEmail(email);
      user.status = user.status === "Active" ? "Blocked" : "Active";
      await user.save();

      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  },
};
