import User from '../models/user.model';

class UserService {
  async getUsers() {
    try {
      return await User.findAll();
    } catch (err) {
      throw err;
    }
  }

  async getUser(email: string) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  async createUser(user: any) {
    try {
      return await User.create(user);
    } catch (err) {
      throw err;
    }
  }

  async updateUser(params: any, email: string) {
    try {
      return await User.update(params, email);
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(email: string) {
    try {
      return await User.delete(email);
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
