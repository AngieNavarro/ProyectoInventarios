import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { ProductoRepository } from '../repositories/producto.repository';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private productoRepository: ProductoRepository) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.productoRepository.getAll();
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.productoRepository.getById(id);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.productoRepository.create(producto);
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.productoRepository.update(id, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.productoRepository.delete(id);
  }
}
