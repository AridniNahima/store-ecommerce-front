import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../../../shared/modules/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //constructor() { }
  private http = inject(HttpClient);

  list() {
    return this.http.get<Product[]>('http://localhost:8080/products'); //verificar en spring boot
  }

  get(id: string) {
    return this.http.get<Product>(`http://localhost:8080/products/${id}`);
  }

  create(product: Product) {
    return this.http.post<Product>('http://localhost:8080/products', product);
  }

  update(id: string, product: Product) {
    return this.http.put<Product>(`http://localhost:8080/products/${id}`, product);
  }

  delete(id: string) {
    return this.http.delete<void>(`http://localhost:8080/products/${id}`);
  }
}
