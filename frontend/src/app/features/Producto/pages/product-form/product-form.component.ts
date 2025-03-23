import { ProductoService } from './../../../../core/services/producto.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../../core/models/producto.model';
import {CommonModule} from '@angular/common'
declare var bootstrap: any; // Importa Bootstrap desde el global scope

@Component({
  selector: 'app-product-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  idProducto!: number ;
  formInventario: FormGroup;
  private productoservice = inject(ProductoService);
  mensaje: boolean = false;
  titulo: string = 'Registrar';
  clase:string='toast-header bg-info text-white'
  public errores: string[] = []; // Almacenar los errores de validación

  constructor(private routeAct: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.formInventario = this.fb.group({
      createdAt: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock_inicial: ['', [Validators.required, Validators.min(0)]],
      stock_actual: ['', [Validators.required, Validators.min(0)]],
      compra: ['', [Validators.required, Validators.min(0)]],
      venta: ['', [Validators.required, Validators.min(0)]],
      estado: ['', Validators.required]
    });
    this.idProducto = Number(routeAct.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    console.log(this.idProducto)
    if (this.idProducto != 0) {
      this.titulo = 'Actualizar'
      this.productoservice.obtenerProductoPorId(this.idProducto).subscribe(
        {
          next: (data) => {
            this.formInventario.patchValue({
              createdAt: data.createdAt,
              codigo: data.codigo,
              nombre: data.nombre,
              descripcion: data.descripcion,
              stock_inicial: data.stock_inicial,
              stock_actual: data.stock_actual,
              compra: data.compra,
              venta: data.venta
            })
          },
          error: (err) => {
            this.clase='toast-header bg-danger text-white'
            if (err.error && err.error.errors) {
              for (let campo in err.error.errors) {
                this.errores.push(`${campo}: ${err.error.errors[campo].join(', ')}`);
              }
            } else {
              this.errores.push("Ocurrió un error inesperado.");
            }
          }
        }
      )
    }
  }
  formatNumber(event: any,text:string) {
    let value = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    value = parseInt(value, 10).toLocaleString('es-CO'); // Formato con puntos
     this.formInventario.get(text)?.setValue(value, { emitEvent: false }); // Actualizar campo sin disparar eventos infinitos
  }
  volver() {
    this.router.navigate(['/']);
  }
  addproducto() {
    try {
      const ventaValue = this.formInventario.get('venta')?.value;
      const compraValue = this.formInventario.get('compra')?.value;
      const ventaSinFormato = ventaValue ? parseInt(ventaValue.toString().replace(/[\.,]/g, ''), 10) : 0;
      const compraSinFormato = compraValue ? parseInt(compraValue.toString().replace(/[\.,]/g, ''), 10) : 0;

      const productos: Producto = {
        codigo: this.formInventario.get('codigo')?.value,
        nombre: this.formInventario.get('nombre')?.value,
        descripcion: this.formInventario.get('descripcion')?.value,
        stock_inicial: this.formInventario.get('stock_inicial')?.value,
        stock_actual: this.formInventario.get('stock_inicial')?.value,
        compra: compraSinFormato.toString(),
        venta: ventaSinFormato.toString(),
        createdAt: this.formInventario.get('createdAt')?.value,
        updatedAt: this.formInventario.get('createdAt')?.value,
        estado: 'Disponible'
      };

      console.log(productos);
      console.log(this.idProducto);

      const servicio = this.idProducto === 0
        ? this.productoservice.agregarProducto(productos)
        : this.productoservice.actualizarProducto(this.idProducto, productos);

      servicio.subscribe({
        next: (data) => {
          this.mensaje = true;
          this.clase='toast-header bg-info text-white'
          this.mostrarToast(`Producto ${productos.nombre} ${this.idProducto === 0 ? 'registrado' : 'actualizado'} correctamente.`);

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error(error);
          this.mensaje = true;
          this.clase='toast-header bg-danger text-white'
          let errorMessage = 'Ocurrió un error inesperado.';
          if (error.error?.error) {
            errorMessage = error.error.error;
          } else if (error.message) {
            errorMessage = error.error;
          }

          this.mostrarToast(errorMessage);
        }
      });
    } catch (error) {
      console.error('Error inesperado en addproducto():', error);
      this.mostrarToast('Ocurrió un error al procesar el producto.');
    }
  }

  // Método reutilizable para mostrar notificaciones
  mostrarToast(mensaje: string) {
    const toastBody = document.querySelector('#registroToast .toast-body');
    if (toastBody) {
      toastBody.textContent = mensaje;
    }
    const toastEl = document.getElementById('registroToast');
    if (toastEl) {
      const toastInstance = new bootstrap.Toast(toastEl);
      toastInstance.show();
    }
  }

}
