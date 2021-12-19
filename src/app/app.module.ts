import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { FormsModule } from '@angular/forms';
import { ConvertToSpacesPipe } from './shared/convert-to-space.pipe';
import { StarComponent } from './shared/star.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductNotFoundComponent } from './products/product-not-found.component';
import { ProductDetailGuard } from './products/product-detail.guard';
@NgModule({
  declarations: [
    AppComponent ,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent,
    ProductNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "products" , component: ProductListComponent },
      { path: "products/:id" , component: ProductDetailComponent , canActivate: [ProductDetailGuard] },
      { path: "ProductNotFound" , component: ProductNotFoundComponent },
      { path: "welcome" , component: WelcomeComponent },
      { path: "" , redirectTo:"welcome", pathMatch: "full" },
      //--- ** == 404
     // { path: "**" , redirectTo:"welcome", pathMatch: "full" },

    ])

  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
