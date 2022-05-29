import jwt from 'jsonwebtoken';
import { IntegerDataType } from 'sequelize/types';
import { IUserDto } from '../dtos/userDto';
import { Token } from '../models/models';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (payload: IUserDto) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '30m',
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (
  userId: IntegerDataType,
  refreshToken: string
) => {
  console.log({ userId, refreshToken });

  const tokenData = await Token.findOne({ where: { userId } });

  console.log({ tokenData });
  if (tokenData) {
    return tokenData.update('refreshToken', refreshToken);
  }

  await Token.create({
    refreshToken,
    userId,
  });
};
