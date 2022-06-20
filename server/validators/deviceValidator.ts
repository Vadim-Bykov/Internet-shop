import { body } from 'express-validator';

export const createDeviceValidator = [
  body(
    ['name', 'price', 'brandId', 'typeId'],
    "Fields 'name', 'price', 'brandId', 'typeId' are required"
  ).exists(),
];
