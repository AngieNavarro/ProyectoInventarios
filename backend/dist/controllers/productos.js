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
exports.updateProducto = exports.postProducto = exports.deleteProducto = exports.getProducto = exports.getProductos = void 0;
const producto_services_1 = require("./../services/producto.services");
const prodService = new producto_services_1.ProductoServices();
const getProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProducts = yield prodService.obtenerProductos();
        res.json(listProducts);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductos = getProductos;
const getProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield prodService.obtenerProductosId(Number(id));
        if (products) {
            res.json(products);
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getProducto = getProducto;
const deleteProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield prodService.obtenerProductosId(Number(id));
        if (!products) {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            });
        }
        else {
            yield prodService.eliminarProducto(Number(id));
            res.json({
                msg: 'El producto fue eliminado con exito'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProducto = deleteProducto;
const postProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        yield prodService.crearProducto(body);
        res.json({
            msg: 'El producto fue agregado con exito'
        });
    }
    catch (error) {
        // console.log(error)
        // res.json({
        //     msg: "Ocurrio un error comuniquese con soporte"
        // })
        next(error);
    }
});
exports.postProducto = postProducto;
const updateProducto = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = Number(req.params.id);
    const products = yield prodService.obtenerProductosId((id));
    if (products) {
        try {
            yield prodService.actualizarProducto(id, body);
            res.json({
                msg: "El producto fue actualizado con exito"
            });
        }
        catch (error) {
            next(error);
            // res.json({
            //     msg: "Ocurrio un error comuniquese con soporte"
            // })
        }
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        });
    }
});
exports.updateProducto = updateProducto;
