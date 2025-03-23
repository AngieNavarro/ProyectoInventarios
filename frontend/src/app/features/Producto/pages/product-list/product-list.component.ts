import { ProductoService } from './../../../../core/services/producto.service';
import { Component, inject } from '@angular/core';
import { Producto } from '../../../../core/models/producto.model';
import { ProductTableComponent } from "../../../../shared/components/product-table/product-table.component";
import { SearchService } from '../../../../core/services/behavior-subject.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productos: Producto[] = [];
  productos_filtrados: Producto[] = [];
  private prodService = inject(ProductoService);
  private _searchService = inject(SearchService);

  ngOnInit(): void {
    console.log('inicio lista')
    this.cargarProductos();
  }
  cargarProductos() {
    this.prodService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.productos_filtrados = data;
      },
      error: (err) => console.error('Error al obtener productos', err),
    });

    // Escuchar cambios en la búsqueda
    this._searchService.searchTerm$.subscribe((term) => {
      this.filtrarProductos(term);
    });
  }

  filtrarProductos(term: string) {
    if (!term) {
      this.productos_filtrados = this.productos; // Mostrar todos si no hay búsqueda
    } else {
      this.productos_filtrados = this.productos.filter((p) =>
        p.nombre.toLowerCase().includes(term.toLowerCase()) ||
        p.codigo.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
}
