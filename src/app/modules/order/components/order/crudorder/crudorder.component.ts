import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../../order/services/order.service';
import { Order } from '../../../../../shared/modules/order.model';
import { ProductService } from '../../../../products/services/product.service';
import { Product } from '../../../../../shared/modules/product.model';
import { StoreService } from '../../../../store/services/store.service';
import { Store } from '../../../../../shared/modules/store.model';

@Component({
  selector: 'app-crudorder',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './crudorder.component.html',
  styleUrl: './crudorder.component.css'
})
export class CrudorderComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private storeService = inject(StoreService);
  private productService = inject(ProductService);



  form?: FormGroup;
  order?: Order;
  stores: Store[] = [];
  products: Product[] = [];


  //obtiene ID categoria
  ngOnInit(): void {

    const numOrder = 0;
    let fechaLocal = new Date();

    // Obtener el año, mes y día de la fecha local
    let año = fechaLocal.getFullYear();
    let mes = fechaLocal.getMonth() + 1; // Añadir 1 porque los meses van de 0 a 11
    let dia = fechaLocal.getDate();
    let horas = fechaLocal.getHours();
    let minutos = fechaLocal.getMinutes();
    let segundos = fechaLocal.getSeconds();

    // Formatear el mes, día, horas, minutos y segundos para que tengan siempre 2 dígitos
    let mesFormateado = mes < 10 ? '0' + mes : mes;
    let diaFormateado = dia < 10 ? '0' + dia : dia;
    let horasFormateadas = horas < 10 ? '0' + horas : horas;
    let minutosFormateados = minutos < 10 ? '0' + minutos : minutos;
    let segundosFormateados = segundos < 10 ? '0' + segundos : segundos;

    // Crear una cadena con el formato 'yyyy-MM-dd HH:mm:ss'
    let fechaFormateada = `${año}-${mesFormateado}-${diaFormateado} ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;

    const id = this.route.snapshot.paramMap.get('id');
    //veirifca si Id es nulo
    if (id) {
      this.orderService.get(id)
        .subscribe(order => {
          this.order = order;
          this.form = this.fb.group({
            name: [order.name, [Validators.required]],
            date: [order.date, [Validators.required]],
            shippingAddress: [order.shippingAddress, [Validators.required]],
            delivery: [order.delivery, [Validators.required]],
            storeId: [order.store.id, [Validators.required]],
            items: [order.items, [Validators.required]]
          })
          this.loadStores();
        });
    } else {
      this.form = this.fb.group({

        name: ['Orden Nº ' + numOrder + 1, [Validators.required]],
        date: [fechaFormateada, [Validators.required]],
        shippingAddress: ['', [Validators.required]],
        delivery: ['', [Validators.required]],
        storeId: ['', [Validators.required]],
        items: ['', [Validators.required]]
      })
      this.loadStores();
      console.log(this.loadStores());
    }
  }
  loadStores() {
    this.storeService.list().subscribe(
      (store: Store[]) => {
        this.stores = store;
      },
      (error) => {
        console.error('Error al cargar las tiendas:', error);
      }
    );
  }

  save() {
    const orderForm = this.form!.value;

    if (this.order) {
      this.orderService.update(this.order.id, orderForm)
        .subscribe(() => {
          this.router.navigate(['order']);
        });
    } else {
      this.orderService.create(orderForm)
        .subscribe(() => {
          this.router.navigate(['order']);
        });
    }
  }

}
