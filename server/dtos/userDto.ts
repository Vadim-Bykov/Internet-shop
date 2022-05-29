import { IntegerDataType } from 'sequelize/types';
import { UserAttributes } from '../models/models';

export interface IUserDto {
  email: string;
  id: IntegerDataType;
  isActivated: boolean;
  picture?: string;
  roles: string[];
}

export const getUserDto = ({
  email,
  id,
  isActivated,
  picture,
  roles,
}: UserAttributes) => ({
  email,
  id,
  isActivated,
  picture,
  roles,
});
