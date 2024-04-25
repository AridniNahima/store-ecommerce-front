import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { Store } from '../../../../../shared/modules/store.model';

@Component({
  selector: 'app-crudstore',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './crudstore.component.html',
  styleUrl: './crudstore.component.css'
})
export class CrudstoreComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private storeService = inject(StoreService);

  form?: FormGroup;
  store?: Store;

  //obtiene ID categoria
  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    //veirifca si Id es nulo
    if (id) {
      this.storeService.get(id)
        .subscribe(store => {
          this.store = store;
          this.form = this.fb.group({

            name: [store.name, [Validators.required]],
            address: [store.address, [Validators.required]],
            city: [store.city, [Validators.required]],
            openingHours: [store.openingHours, [Validators.required]]

          })
        });
    } else {
      this.form = this.fb.group({

        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        openingHours: ['', [Validators.required]]

      })
    }
  }

  save() {
    const storeForm = this.form!.value;

    if (this.store) {
      this.storeService.update(this.store.id, storeForm)
        .subscribe(() => {
          this.router.navigate(['store']);
        });
    } else {
      this.storeService.create(storeForm)
        .subscribe(() => {
          this.router.navigate(['store']);
        });
    }
  }
}
