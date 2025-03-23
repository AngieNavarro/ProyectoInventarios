"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_1 = __importDefault(require("../config/conexion"));
const sequelize_1 = require("sequelize");
const Producto = conexion_1.default.define('producto', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING(45),
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(45),
    },
    stock_inicial: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    stock_actual: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    compra: {
        type: sequelize_1.DataTypes.STRING(45),
    },
    venta: {
        type: sequelize_1.DataTypes.STRING(45),
    },
    estado: {
        type: sequelize_1.DataTypes.STRING(45),
    },
}, {
    timestamps: true, // Esto habilita createdAt y updatedAt
});
exports.default = Producto;
