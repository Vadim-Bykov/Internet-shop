import { TController } from './controllerTypes';

export const create: TController = async (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAll: TController = async (req, res, next) => {
  try {
    res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOne: TController = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json();
  } catch (error) {
    console.log(error);
  }
};
