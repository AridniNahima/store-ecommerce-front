import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Order } from '../../../shared/modules/order.model';
import { Product } from '../../../shared/modules/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Product[]>('http://localhost:8080/products'); //verificar en spring boot
  }
}
