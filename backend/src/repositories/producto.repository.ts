import { UniqueConstraintError } from 'sequelize';
import Producto from '../models/producto'
import { ErroresControlados } from '../utils/error-handler';

export class productoRepositories {
    async getAll() {
        try {
            return await Producto.findAll();

        } catch (error) {
            throw new ErroresControlados('Error al obtener producto', 500)
        }
    }
    async getById(id: number) {
        try {
            return await Producto.findByPk(id);

        } catch (error) {
            throw new ErroresControlados('Error al cargar el producto', 500)
        }
    }
    async create(data: any) {
        try {
            return await Producto.create(data);

        } catch (error: any) {
            if (error instanceof UniqueConstraintError) {
                throw new ErroresControlados(`El código ${data.codigo} del producto ya existe`, 400);

            }else{
                throw new ErroresControlados(error.parent?.sqlMessage, error.parent?.errno)
            }
        }

    }

    async update(id: number, data: any) {
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) return null;
            return await producto.update(data);
        } catch (error) {
            throw new ErroresControlados('Error al actualizar el producto', 500)

        }

    }

    async delete(id: number) {
        try {
                    const producto = await Producto.findByPk(id);
        if (!producto) return null;
        await producto.destroy();
        return producto;
        } catch (error) {
            throw new ErroresControlados('Error al elimnar el producto', 500)

        }

    }
}