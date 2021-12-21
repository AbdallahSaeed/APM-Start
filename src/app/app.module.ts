import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

import { UserSettingFormModule } from './user-setting-form/user-setting-form.module';
@NgModule({
  declarations: [
    AppComponent ,
    WelcomeComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      
      { path: "welcome" , component: WelcomeComponent },
      { path: "" , redirectTo:"welcome", pathMatch: "full" },
      //--- ** == 404
     // { path: "**" , redirectTo:"welcome", pathMatch: "full" },

    ]),
    ProductModule,
    UserSettingFormModule
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
