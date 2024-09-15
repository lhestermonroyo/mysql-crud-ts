import { check } from 'express-validator';

export const createUserValidator = [
  check('email', 'Enter a valid email.').isEmail(),
  check('password', 'Password must be at least 6 characters.').isLength({
    min: 6,
  }),
  check('confirmPassword', 'Password must be at least 6 characters.').custom(
    (value, { req }) => value === req.body.password
  ),
  check('firstname', 'First name is required.').not().isEmpty(),
  check('lastname', 'Last name is required.').not().isEmpty(),
];

export const loginUserValidator = [
  check('email', 'Enter a valid email.').isEmail(),
  check('password', 'Password must be at least 6 characters.').isLength({
    min: 6,
  }),
];

export const createNoteValidator = [
  check('title', 'Title is required.').not().isEmpty(),
  check('content', 'Content is required.').not().isEmpty(),
];
