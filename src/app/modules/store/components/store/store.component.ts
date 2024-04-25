import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../../../shared/modules/store.model';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {

  private storeService = inject(StoreService);

  stores: Store[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.storeService.list()
      .subscribe(stores => {
        this.stores = stores;
      });
  }

  deleteStore(category: Store) {
    this.storeService.delete(category.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
