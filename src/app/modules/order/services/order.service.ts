import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../../../shared/modules/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  //constructor() { }
  private http = inject(HttpClient);

  list() {
    return this.http.get<Order[]>('http://localhost:8080/orders');
  }

  get(id: string) {
    return this.http.get<Order>(`http://localhost:8080/orders/${id}`);
  }

  create(order: Order) {
    return this.http.post<Order>('http://localhost:8080/orders', order);
  }

  update(id: string, order: Order) {
    return this.http.put<Order>(`http://localhost:8080/orders/${id}`, order);
  }

  delete(id: string) {
    return this.http.delete<void>(`http://localhost:8080/orders/${id}`);
  }
}
