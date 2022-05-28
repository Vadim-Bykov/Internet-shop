import sequelize, { ModelDefined, Optional } from 'sequelize';
import { db } from '../db';

const { DataTypes } = sequelize;

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'role'>;

export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  db.define('user', {
    id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING(), unique: true },
    password: { type: DataTypes.STRING() },
    role: { type: DataTypes.STRING(), defaultValue: 'USER' },
  });

export const Basket = db.define('basket', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

export const BasketDevice = db.define('besket_device', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

interface DeviceAttributes {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
}

type DeviceCreationAttributes = Optional<DeviceAttributes, 'rating'>;

export const Device: ModelDefined<DeviceAttributes, DeviceCreationAttributes> =
  db.define('device', {
    id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(), unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER(), allowNull: false },
    rating: { type: DataTypes.INTEGER(), defaultValue: 0 },
    img: { type: DataTypes.STRING(), allowNull: false },
  });

export const Type = db.define('type', {
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

export const DeviceInfo = db.define('device_info', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(), allowNull: false },
  description: { type: DataTypes.STRING(), allowNull: false },
});

export const TypeBrand = db.define('type_brand', {
  id: { type: DataTypes.INTEGER(), primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

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
