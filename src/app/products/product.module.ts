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
import { ProductShellDetailComponent } from './product-shell/product-shell-detail.component';
import { ProductShellListComponent } from './product-shell/product-shell-list.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags.component';
import { ProductEditWizardComponent } from './product-edit-wizard.component';
import { AuthGuard } from '../user/auth.guard';
import { ProductEditWizardGuard } from './product-edit-wizard.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductNotFoundComponent,
    AddProductComponent,
    ProductEditComponent,
    ProductShellDetailComponent,
    ProductShellListComponent,
    ProductShellComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductEditWizardComponent,
  ],
  imports: [
    // ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        // canActivate: [ProductDetailGuard],
        // for resolve Route
        resolve: { resolveData: ProductResolverService },
      },
      {
        path: ':id/edit',
        //--- old edit component
        // component: ProductEditComponent, canDeactivate: [ProductEditGuard],
        component: ProductEditWizardComponent,
        canDeactivate:[ProductEditWizardGuard],
        // for resolve Route
        resolve: { resolveData: ProductResolverService },

        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent },
        ],
      },
      { path: 'ProductNotFound', component: ProductNotFoundComponent },
    ]),
    SharedModule,
  ],
  providers: [ProductParameterService],
})
export class ProductModule {}
