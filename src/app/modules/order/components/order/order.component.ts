import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Order } from '../../../../shared/modules/order.model';
import { OrderService } from '../../services/order.service';
import { Store } from '../../../../shared/modules/store.model';
import { StoreService } from '../../../store/services/store.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  private orderService = inject(OrderService);

  orders: Order[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.orderService.list()
      .subscribe(orders => {
        this.orders = orders;
      });
  }


  deleteOrder(order: Order) {
    this.orderService.delete(order.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
