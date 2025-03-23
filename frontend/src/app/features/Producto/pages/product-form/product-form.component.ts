import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  formatNumber(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    value = parseInt(value, 10).toLocaleString('es-CO'); // Formato con puntos
    // this.formulario.get('compra')?.setValue(value, { emitEvent: false }); // Actualizar campo sin disparar eventos infinitos
  }
}
