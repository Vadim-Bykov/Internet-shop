import { body } from 'express-validator';

export const createTypeValidator = [
  body('name', 'Name is required, min 2 letters').trim().isLength({ min: 2 }),
];
