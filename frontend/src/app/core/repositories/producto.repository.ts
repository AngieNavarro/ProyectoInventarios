import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoRepository {
  private apiUrl = 'http://localhost:3003/';
  private MyapiUrl = 'api/productos';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}${this.MyapiUrl}`);
  }

  // getById(id: number): Observable<Producto> {
  //   return this.http.get<Producto>(`${this.apiUrl}${this.MyapiUrl}/${id}`);
  // }

  // create(producto: Producto): Observable<Producto> {
  //   return this.http.post<Producto>(this.apiUrl, producto);
  // }

  // update(id: number, producto: Producto): Observable<Producto> {
  //   return this.http.put<Producto>(`${this.apiUrl}${this.MyapiUrl}/${id}`, producto);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}${this.MyapiUrl}/${id}`);
  // }
}
