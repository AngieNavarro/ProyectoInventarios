import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductTableComponent } from "./shared/components/product-table/product-table.component";
import { ProductListComponent } from "./features/Producto/pages/product-list/product-list.component";
import { SearchService } from './core/services/behavior-subject.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private _searchService = inject(SearchService);
  onBusqueda(envet: Event) {
    const inputElement = event?.target as HTMLInputElement;
    const valorBusqueda = inputElement.value;
    this._searchService.setSearchTerm(valorBusqueda); // Enviar búsqueda al servicio
  }
  preventSubmit(event: Event) {
    event.preventDefault(); // Evita que el formulario se envíe
  }

}
