import { ProductService } from './../../../products/services/product.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Store } from '../../../../shared/modules/store.model';
import { Product } from '../../../../shared/modules/product.model';
import { Order } from '../../../../shared/modules/order.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  private productService = inject( ProductService);
  form?: FormGroup;
  stores: Store[] = [];
  products: Product[] = [];
  orders: Order[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.productService.list()
      .subscribe(products => {
        this.products = products;
      });
    console.log(this.products);
  }

  makeOrder(){

  }


  @Output() close = new EventEmitter<void>();

  constructor() { }

  closeModal() {
    this.close.emit();
  }
}
