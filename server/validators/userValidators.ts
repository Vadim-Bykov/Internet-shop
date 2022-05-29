import { body, validationResult } from 'express-validator';

const email = body('email', 'Invalid email').isEmail();
const password = body(
  'password',
  'Length have to be between 4 - 16 characters'
).isLength({
  min: 4,
  max: 16,
});

export const registrationValidator = [email, password];
export const loginValidator = [email];
