import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '../../../shared/modules/store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  //constructor() { }
  private http = inject(HttpClient);

  list() {
    return this.http.get<Store[]>('http://localhost:8080/stores');
  }

  get(id: string) {
    return this.http.get<Store>(`http://localhost:8080/stores/${id}`);
  }

  create(store: Store) {
    return this.http.post<Store>('http://localhost:8080/stores', store);
  }

  update(id: string, store: Store) {
    return this.http.put<Store>(`http://localhost:8080/stores/${id}`, store);
  }

  delete(id: string) {
    return this.http.delete<void>(`http://localhost:8080/stores/${id}`);
  }
}
