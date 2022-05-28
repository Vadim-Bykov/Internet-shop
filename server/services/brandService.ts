import { ApiError } from './../error/ApiError';
import { Brand } from '../models/models';

export const create = async (name: string) => {
  const brandCandidate = await Brand.findOne({ where: { name } });

  if (brandCandidate) {
    throw ApiError.badRequest(`Brand ${name} already exists`);
  }

  const brand = await Brand.create({ name });

  return brand;
};

export const getAll = async () => {
  const brands = await Brand.findAll();
  return brands;
};
