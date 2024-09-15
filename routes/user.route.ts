import express from 'express';

import UserController from '../controllers/user.controller';
import {
  createUserValidator,
  loginUserValidator,
} from '../middleware/validator.middleware';
import { checkAuth } from '../utils/auth.util';

const router = express.Router();

router.get('/', checkAuth, UserController.getUsers);
router.get('/:email', checkAuth, UserController.getUser);
router.post('/create', createUserValidator, UserController.createUser);
router.post('/login', loginUserValidator, UserController.login);
router.put('/:email', checkAuth, UserController.updateUser);
router.delete('/:email', checkAuth, UserController.deleteUser);

export default router;
