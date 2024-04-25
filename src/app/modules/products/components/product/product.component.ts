import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../shared/modules/product.model';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.productService.list()
      .subscribe(products => {
        this.products = products;
      });
  }

  deleteProduct(product: Product) {
    this.productService.delete(product.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
