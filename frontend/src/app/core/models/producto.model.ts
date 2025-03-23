export interface Producto {
  id?: number;
  codigo:string;
  nombre: string;
  descripcion: string;
  stock_inicial:number;
  stock_actual:number;
  compra:string;
  venta:string;
  estado:string;
  createdAt:Date;
  updatedAt:Date;
}
