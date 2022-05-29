import fileUpload from 'express-fileupload';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ApiError } from '../error/ApiError';
import { User } from '../models/models';
import { saveFile } from './fileService';
import { getUserDto, IUserDto } from '../dtos/userDto';
import * as tokenService from './tokenService';

interface IRegistrationBody {
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
  picture?: fileUpload.UploadedFile;
}

export const registration = async ({
  email,
  password,
  role,
  picture,
}: IRegistrationBody) => {
  const candidate = await User.findOne({ where: { email } });

  if (candidate) {
    throw ApiError.badRequest(`User with email ${email} already exists`);
  }

  const activationLink = v4();
  const hashPassword = await bcrypt.hash(password, 3);
  const fileName = saveFile(picture);

  const user = await User.create({
    email,
    password: hashPassword,
    activationLink,
    picture: fileName,
    roles: role && [role],
  });

  const userDto = getUserDto(user as unknown as IUserDto);
  const { accessToken, refreshToken } = tokenService.generateToken(userDto);
  console.log({ accessToken, refreshToken });

  await tokenService.saveRefreshToken(userDto.id, refreshToken);

  return { user: userDto, accessToken, refreshToken };
};
