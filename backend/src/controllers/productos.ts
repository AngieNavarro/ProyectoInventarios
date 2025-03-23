import { ProductoServices } from './../services/producto.services';
import { Response, Request, NextFunction } from "express"
import Producto from "../models/producto"

const prodService = new ProductoServices();

export const getProductos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listProducts = await prodService.obtenerProductos();
        res.json(listProducts)
    } catch (error) {
        next(error)
    }

}

export const getProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const products = await prodService.obtenerProductosId(Number(id));

        if (products) {
            res.json(products)
        } else {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        }

    } catch (error) {
        next(error)
    }

}
export const deleteProducto = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const products = await prodService.obtenerProductosId(Number(id));
        if (!products) {
            res.status(404).json({
                msg: `No existe un producto con el id ${id}`
            })
        } else {
            await prodService.eliminarProducto(Number(id));
            res.json({
                msg: 'El producto fue eliminado con exito'
            })
        }
    } catch (error) {
        next(error)
    }


}

export const postProducto = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
        await prodService.crearProducto(body)
        res.json({
            msg: 'El producto fue agregado con exito'
        })
    } catch (error) {
        // console.log(error)
        // res.json({
        //     msg: "Ocurrio un error comuniquese con soporte"
        // })
        next(error)
    }

}

export const updateProducto = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = Number(req.params['id']);
    const products = await prodService.obtenerProductosId((id));
    if (products) {
        try {
            await prodService.actualizarProducto(id, body);
            res.json({
                msg: "El producto fue actualizado con exito"
            })
        } catch (error) {
            next(error)
            // res.json({
            //     msg: "Ocurrio un error comuniquese con soporte"
            // })
        }

    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${id}`
        })
    }

}
