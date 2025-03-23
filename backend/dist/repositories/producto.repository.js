"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoRepositories = void 0;
const sequelize_1 = require("sequelize");
const producto_1 = __importDefault(require("../models/producto"));
const error_handler_1 = require("../utils/error-handler");
class productoRepositories {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield producto_1.default.findAll();
            }
            catch (error) {
                throw new error_handler_1.ErroresControlados('Error al obtener producto', 500);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield producto_1.default.findByPk(id);
            }
            catch (error) {
                throw new error_handler_1.ErroresControlados('Error al cargar el producto', 500);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                return yield producto_1.default.create(data);
            }
            catch (error) {
                if (error instanceof sequelize_1.UniqueConstraintError) {
                    throw new error_handler_1.ErroresControlados(`El código ${data.codigo} del producto ya existe`, 400);
                }
                else {
                    throw new error_handler_1.ErroresControlados((_a = error.parent) === null || _a === void 0 ? void 0 : _a.sqlMessage, (_b = error.parent) === null || _b === void 0 ? void 0 : _b.errno);
                }
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const producto = yield producto_1.default.findByPk(id);
                if (!producto)
                    return null;
                return yield producto.update(data);
            }
            catch (error) {
                throw new error_handler_1.ErroresControlados('Error al actualizar el producto', 500);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const producto = yield producto_1.default.findByPk(id);
                if (!producto)
                    return null;
                yield producto.destroy();
                return producto;
            }
            catch (error) {
                throw new error_handler_1.ErroresControlados('Error al elimnar el producto', 500);
            }
        });
    }
}
exports.productoRepositories = productoRepositories;
