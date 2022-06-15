import { UploadedFile } from 'express-fileupload';
import sequelize, { IntegerDataType, ModelDefined, Optional } from 'sequelize';
import { db } from '../db';

const { DataTypes } = sequelize;

export type TRole = 'ADMIN' | 'USER';

export interface UserAttributes {
  id: IntegerDataType;
  email: string;
  password: string;
  roles: TRole[];
  activationLink: string;
  isActivated: boolean;
  picture?: string;
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'roles' | 'id' | 'isActivated' | 'picture'
>;

export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  db.define('user', {
    id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(), unique: true },
    password: { type: DataTypes.STRING() },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING()),
      defaultValue: ['USER'],
    },
    activationLink: { type: DataTypes.STRING(), allowNull: false },
    isActivated: { type: DataTypes.BOOLEAN(), defaultValue: false },
    picture: { type: DataTypes.STRING() },
  });

export interface IToken {
  refreshToken: string;
  userId: IntegerDataType;
}
export const Token: ModelDefined<IToken, {}> = db.define('token', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING(), allowNull: false },
});

export const Basket = db.define('basket', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

export const BasketDevice = db.define('basket_device', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

interface DeviceAttributes {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: UploadedFile | string;
  brandId: string;
  typeId: string;
  info: DeviceInfoCreationAttributes;
}

export type DeviceCreationAttributes = Optional<
  DeviceAttributes,
  'rating' | 'info' | 'id' | 'img'
>;

export const Device: ModelDefined<DeviceAttributes, DeviceCreationAttributes> =
  db.define('device', {
    id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(), unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER(), allowNull: false },
    rating: { type: DataTypes.INTEGER(), defaultValue: 0 },
    img: { type: DataTypes.STRING(), allowNull: false },
  });

interface TypeAttributes {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export type TypeCreationAttributes = Optional<
  TypeAttributes,
  'createdAt' | 'updatedAt' | 'id'
>;

export const Type: ModelDefined<TypeAttributes, TypeCreationAttributes> =
  db.define('type', {
    id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(), unique: true, allowNull: false },
  });

export const Brand = db.define('brand', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(), unique: true, allowNull: false },
});

export const Rating = db.define('rating', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER(), allowNull: false },
});

interface DeviceInfoAttributes {
  id: number;
  title: string;
  description: string;
  deviceId: number;
}

export type DeviceInfoCreationAttributes = Optional<DeviceInfoAttributes, 'id'>;

export const DeviceInfo: ModelDefined<
  DeviceInfoAttributes,
  DeviceInfoCreationAttributes
> = db.define('device_info', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(), allowNull: false },
  description: { type: DataTypes.STRING(), allowNull: false },
});

export const TypeBrand = db.define('type_brand', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

BasketDevice.hasOne(Device); // ???
Device.belongsTo(BasketDevice); // ???

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: 'info' });
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });
