import { Component, Input, AfterViewInit, inject, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../../core/models/producto.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../core/services/producto.service';
declare var bootstrap: any; // Importa Bootstrap desde el global scope

@Component({
  selector: 'app-product-table',
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent implements AfterViewInit {
  @Input() productos: Producto[] = [];
  productoaEliminar: Producto | null = null;
  private _servicioProducto = inject(ProductoService);
  public errores: string[] = [];
  @Output() productoEliminado= new EventEmitter<void>();

  constructor(private route: Router) {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }, 100);
  }

  nuevo() {
    this.route.navigate(['/api/productos/add'])
  }

  editar(prod: Producto) {
    this.route.navigate(['/api/productos/', prod.id])
  }
  eliminar(objeto: Producto) {
    this.productoaEliminar = objeto;
    // Muestra el modal de Bootstrap
    let modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();
  }

  confirmarEliminacion() {
    if (!this.productoaEliminar) return;
    this._servicioProducto.eliminarProducto(Number(this.productoaEliminar.id)).subscribe({
      next: (data) => {
        // Opcional: refresca la lista o redirige a otra página
        this.productoEliminado.emit();
        setTimeout(() => {
          this.route.navigate(['/']);
        }, 2000);
        // Actualiza el contenido del toast con el nombre del estudiante
        const toastBody = document.querySelector('#eliminacionToast .toast-body');
        if (toastBody) {
          // Actualiza el mensaje; también puedes actualizar el <span id="nombreToast"> si lo prefieres.
          toastBody.textContent = `Producto ${this.productoaEliminar!.nombre} eliminado correctamente.`;
        }
        // Obtén el elemento toast y muestra el toast
        const toastEl = document.getElementById('eliminacionToast');
        if (toastEl) {
          const toastInstance = new bootstrap.Toast(toastEl);
          toastInstance.show();
        }
      },
      error: (err) => {
        console.error("Error en la solicitud:", err);
        if (err.error && err.error.errors) {
          for (let campo in err.error.errors) {
            this.errores.push(`${campo}: ${err.error.errors[campo].join(', ')}`);
          }
        } else {
          this.errores.push("Ocurrió un error inesperado.");
        }
      }
    });
    // Ocultar el modal después de confirmar
    let modal = bootstrap.Modal.getInstance(document.getElementById('confirmacionModal'));
    modal.hide();
  }

}
