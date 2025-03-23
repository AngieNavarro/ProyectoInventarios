// src/app/services/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>(''); // Estado inicial vacío
  searchTerm$ = this.searchTerm.asObservable(); // Observable para suscribirse

  setSearchTerm(term: string) {
    this.searchTerm.next(term); // Actualiza el valor de búsqueda
  }
}
