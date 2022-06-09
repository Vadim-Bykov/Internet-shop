import { Sequelize } from 'sequelize';

export const db = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
  }
);
