import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Order } from '../../../../shared/modules/order.model';
import { OrderService } from '../../services/order.service';


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

  deleteOrder(category: Order) {
    this.orderService.delete(category.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
