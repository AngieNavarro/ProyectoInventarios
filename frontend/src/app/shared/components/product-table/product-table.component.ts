import { Component, Input,AfterViewInit  } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { CommonModule } from '@angular/common';
declare var bootstrap: any; // Importa Bootstrap desde el global scope

@Component({
  selector: 'app-product-table',
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements AfterViewInit  {
  @Input() productos: Producto[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 100);
  }

}
