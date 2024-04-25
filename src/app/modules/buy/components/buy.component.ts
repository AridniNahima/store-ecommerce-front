import { Component, inject, OnInit, effect, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { } from '../services/buy.service';
import { Product } from '../../../shared/modules/product.model';
import { ProductService } from '../../products/services/product.service';
import { Order } from '../../../shared/modules/order.model';
import { Store } from '../../../shared/modules/store.model';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css'
})
export class BuyComponent implements OnInit {
  modalOpen: boolean = false;

  private productService = inject(ProductService);

  products: Product[] = [];
  stores: Store[] = [];
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
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  //local Storage usa el metodo EFFECT
  //cada que añadimos nuevos productos guardar los cambios
  //tanto en orden "nuevaOrden" y setteo de la cantidadProducto


}
