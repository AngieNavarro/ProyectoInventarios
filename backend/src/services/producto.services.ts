import { productoRepositories } from './../repositories/producto.repository';

export class ProductoServices {
    private productoRepository = new productoRepositories();

    async obtenerProductos() {
        return await this.productoRepository.getAll();
    }

    async obtenerProductosId(id: number) {
        return await this.productoRepository.getById(id);
    }
    async crearProducto(data: any) {
        return await this.productoRepository.create(data);
    }

    async actualizarProducto(id:number, data: any) {
        return await this.productoRepository.update(id, data);
    }

    async eliminarProducto(id: number) {
        return await this.productoRepository.delete(id);
    }

}