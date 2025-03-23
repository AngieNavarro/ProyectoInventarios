import { Component, inject } from '@angular/core';
import { SearchService } from '../../../core/services/behavior-subject.service';

@Component({
  selector: 'app-nabvar',
  imports: [],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.css'
})
export class NabvarComponent {
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
