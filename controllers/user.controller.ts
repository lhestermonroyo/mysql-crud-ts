import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import UserService from '../services/user.service';

class UserController {
  async getUsers(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const users = await UserService.getUsers().then((users: any) => {
        return users.map((user: any) => {
          delete user.password;
          return user;
        });
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getUser(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.params;

      const user = await UserService.getUser(email);
      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async login(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await UserService.getUser(email);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }

      delete user.password;

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async createUser(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = req.body;

      const newUser = await UserService.createUser({
        ...user,
        status: 'active',
        password: bcrypt.hashSync(user.password, 10),
      });
      delete newUser.password;

      return res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already exists.' });
      }

      return res.status(500).json({ message: err.message });
    }
  }

  async updateUser(req: any, res: any) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.params;
      const user = req.body;

      const updatedUser = await UserService.updateUser(user, email);
      delete updatedUser.password;

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteUser(req: any, res: any) {
    try {
      const { email } = req.params;

      await UserService.deleteUser(email);

      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export default new UserController();
