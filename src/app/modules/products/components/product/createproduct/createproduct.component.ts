import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../../shared/modules/product.model';
import { CategoryService } from '../../../../category/services/category.service';
import { Category } from '../../../../../shared/modules/category.model';

@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  form?: FormGroup;
  product?: Product;
  categories: Category[] = [];

  //selectedCategoryId: any;

  //obtiene ID categoria
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    //veirifca si Id es nulo
    if (id) {
      this.productService.get(id)
        .subscribe(product => {
          this.product = product;
          this.form = this.fb.group({
            name: [product.name, [Validators.required]],
            description: [product.description, [Validators.required]],
            stock: [product.stock, [Validators.required]],
            price: [product.price, [Validators.required]],
            categoryId: [product.category.id, [Validators.required]]
          })
          this.loadCategories();
        });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        stock: ['', [Validators.required]],
        price: ['', [Validators.required]],
        categoryId: ['', [Validators.required]]
      })
      this.loadCategories();
    }
  }
  loadCategories() {
    this.categoryService.list().subscribe(
      (category: Category[]) => {
        this.categories = category;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  save() {
    const productForm = this.form!.value;
    //productForm.category = this.selectedCategoryId;
    //console.log("ID: - " + this.selectedCategoryId);

    if (this.product) {
      this.productService.update(this.product.id, productForm)
        .subscribe(() => {
          this.router.navigate(['product']);
        });
    } else {
      this.productService.create(productForm)
        .subscribe(() => {
          this.router.navigate(['product']);
        });
    }
  }
}
