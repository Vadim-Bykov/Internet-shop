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

export const updateType = async (id: string, name: string) => {
  const type = await Type.findOne({ where: { id } });

  if (!type) {
    throw ApiError.badRequest(`Type with id=${id} is not exists`);
  }

  const updatedType = await Type.update(
    { name },
    { where: { id }, returning: true }
  );

  return updatedType;
};

export const getTypeById = async (id: string) => {
  if (!id) {
    throw ApiError.badRequest('Set id to get data');
  }
  const type = await Type.findOne({ where: { id } });
  if (!type) {
    throw ApiError.badRequest(`Type with id=${id} is not exists`);
  }

  return type;
};

export const removeType = async (id: string) => {
  if (!id) {
    throw ApiError.badRequest('Set id to get data');
  }

  const removedType = await Type.destroy({ where: { id } });
  console.log({ removedType });

  return removedType;
};
