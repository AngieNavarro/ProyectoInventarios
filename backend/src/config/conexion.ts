// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('inventario', 'root', 'Angie2024Mysql', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// export default sequelize;
import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; // <-- Asegurar que está importado

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST!,
  dialect: "mysql",
  dialectModule: mysql2, // <-- Agregar esto explícitamente
  logging: false,
});

export default sequelize;
