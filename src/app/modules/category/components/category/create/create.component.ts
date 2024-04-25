import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../../shared/modules/category.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
})
export default class CreateComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);

  form?: FormGroup;
  category?: Category;

  //obtiene ID categoria
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    //veirifca si Id es nulo
    if (id) {
      this.categoryService.get(parseInt(id))
        .subscribe(category => {
          this.category = category;
          this.form = this.fb.group({
            name: [category.name, [Validators.required]],
            description: [category.description, [Validators.required]]
          })
        });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]]
      })
    }
  }

  save() {
    const categoryForm = this.form!.value;

    if (this.category) {
      this.categoryService.update(this.category.id, categoryForm)
        .subscribe(() => {
          this.router.navigate(['category']);
        });
    } else {
      this.categoryService.create(categoryForm)
        .subscribe(() => {
          this.router.navigate(['category']);
        });
    }
  }
}
