import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterModule } from '@angular/router';
import { Category } from '../../../../shared/modules/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './category.component.html',

})
export default class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);

  categories: Category[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.categoryService.list()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id)
      .subscribe(() => {
        this.loadAll();
      });
  }
}
