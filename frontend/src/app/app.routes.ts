import { Routes } from '@angular/router';
import { ProductFormComponent } from './features/Producto/pages/product-form/product-form.component';
import { ProductListComponent } from './features/Producto/pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'api/productos/add',
    component: ProductFormComponent
  },
  {
    path: 'api/productos/:id',
    component: ProductFormComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
