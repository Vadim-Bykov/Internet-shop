import { Model } from 'sequelize/types';
import { ApiError } from '../error/ApiError';
import { Type, TypeCreationAttributes } from '../models/models';

type TCreateFunc = (
  name: string
) => Promise<Model<{ name: string }, TypeCreationAttributes>>;

export const create: TCreateFunc = async (name: string) => {
  const typeCandidate = await Type.findOne({ where: { name } });

  if (typeCandidate) {
    throw ApiError.badRequest(`Type ${name} already exists`);
  }

  const type = await Type.create({ name });

  return type;
};

export const getAll = async () => {
  const types = await Type.findAll();
  return types;
};
