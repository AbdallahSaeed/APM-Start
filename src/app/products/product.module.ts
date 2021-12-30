import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductNotFoundComponent } from './product-not-found.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductEditComponent } from './product-edit.component';

import { ReactiveFormsModule } from '@angular/forms';


import { ProductEditGuard } from './product-edit.guard';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './ProductData';
import { ProductParameterService } from './product-parameter.service';
 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductNotFoundComponent,
    AddProductComponent,
    ProductEditComponent,
    
  ],
  imports: [
    
    // ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard],
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductEditGuard]
      },
      { path: 'ProductNotFound', component: ProductNotFoundComponent },
    ]),
    SharedModule,
  
  ],
  providers:[
    ProductParameterService
    
  ]
})
export class ProductModule {}
