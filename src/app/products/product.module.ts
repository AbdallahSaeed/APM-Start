import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductNotFoundComponent } from './product-not-found.component';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
 

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductNotFoundComponent,
    AddProductComponent,
  ],
  imports: [  
    RouterModule.forChild([
      { path: "products" , component: ProductListComponent },
      { path: "products/:id" , component: ProductDetailComponent , canActivate: [ProductDetailGuard] },
      { path: "ProductNotFound" , component: ProductNotFoundComponent },
       
    ]),
    SharedModule,
  ]
})
export class ProductModule { }
