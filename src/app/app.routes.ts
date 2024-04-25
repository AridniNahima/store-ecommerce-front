import { Routes } from '@angular/router';
import { ProductComponent } from './modules/products/components/product/product.component';
import { CreateproductComponent } from './modules/products/components/product/createproduct/createproduct.component';
import { StoreComponent } from './modules/store/components/store/store.component';
import { CrudstoreComponent } from './modules/store/components/store/crudstore/crudstore.component';
import { OrderComponent } from './modules/order/components/order/order.component';
import { CrudorderComponent } from './modules/order/components/order/crudorder/crudorder.component';
import { BuyComponent } from './modules/buy/components/buy.component';
import { ModalComponent } from './modules/buy/components/modal/modal.component';

export const routes: Routes = [
  {
    path: 'category',
    loadComponent: () => import('./modules/category/components/category/category.component')
  },
  {
    path: 'category/new',
    loadComponent: () => import('./modules/category/components/category/create/create.component')
  },
  {
    path: 'category/:id/edit',
    loadComponent: () => import('./modules/category/components/category/create/create.component')//reutilizamos para editar
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/new',
    component: CreateproductComponent
  },
  {
    path: 'product/:id/edit',
    component: CreateproductComponent
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'store/new',
    component: CrudstoreComponent
  },
  {
    path: 'store/:id/edit',
    component: CrudstoreComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order/new',
    component: CrudorderComponent
  },
  {
    path: 'order/:id/edit',
    component: CrudorderComponent
  },
  {
    path: 'buy',
    component: BuyComponent
  },
  {
    path: 'modal',
    component: ModalComponent
  }
];
