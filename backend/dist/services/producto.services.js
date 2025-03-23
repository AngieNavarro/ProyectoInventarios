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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoServices = void 0;
const producto_repository_1 = require("./../repositories/producto.repository");
class ProductoServices {
    constructor() {
        this.productoRepository = new producto_repository_1.productoRepositories();
    }
    obtenerProductos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productoRepository.getAll();
        });
    }
    obtenerProductosId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productoRepository.getById(id);
        });
    }
    crearProducto(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productoRepository.create(data);
        });
    }
    actualizarProducto(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productoRepository.update(id, data);
        });
    }
    eliminarProducto(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productoRepository.delete(id);
        });
    }
}
exports.ProductoServices = ProductoServices;
