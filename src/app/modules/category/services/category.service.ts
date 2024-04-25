import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../../../shared/modules/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //constructor() { }
  private http = inject(HttpClient);

  list() {
    return this.http.get<Category[]>('http://localhost:8080/categories');
  }

  get(id: number) {
    return this.http.get<Category>(`http://localhost:8080/categories/${id}`);
  }

  create(category: Category) {
    return this.http.post<Category>('http://localhost:8080/categories', category);
  }

  update(id: number, category: Category) {
    return this.http.put<Category>(`http://localhost:8080/categories/${id}`, category);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/categories/${id}`);
  }
}
