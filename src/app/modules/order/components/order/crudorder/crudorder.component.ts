import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ReactiveFormsModule
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
  products: Product[] = [];
  stores: Store[] = [];
  //obtiene ID categoria
  ngOnInit(): void {

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
        name: ['', [Validators.required]],
        date: ['', [Validators.required]],
        shippingAddress: ['', [Validators.required]],
        delivery: ['', [Validators.required]],
        storeId: ['', [Validators.required]],
        items: ['', [Validators.required]]
      })
      this.loadStores();
    }
  }
  loadStores() {
    this.storeService.list().subscribe(
      (store: Store[]) => {
        this.stores = store;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
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
