import db from '../config/conexion';
import { DataTypes } from 'sequelize'
const Producto = db.define('producto',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.STRING(45),
      },
      nombre: {
        type: DataTypes.STRING(45),
      },
      descripcion: {
        type: DataTypes.STRING(45),
      },
      stock_inicial: {
        type: DataTypes.INTEGER,
      },
      stock_actual: {
        type: DataTypes.INTEGER,
      },
      compra: {
        type: DataTypes.STRING(45),
      },
      venta: {
        type: DataTypes.STRING(45),
      },
      estado: {
        type: DataTypes.STRING(45),
      },
    }, {
      timestamps: true, // Esto habilita createdAt y updatedAt
    });

export default Producto;