import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';


import { UserSettingFormModule } from './user-setting-form/user-setting-form.module';
import { CustomersModule } from './customers/customers.module';
import { MessageModule } from './messages/message.module';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found.component';
 
//---- for Animations  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/ProductData';


@NgModule({
  declarations: [AppComponent ,  WelcomeComponent, PageNotFoundComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData,{ delay: 1000 }), // , { delay: 1000 }
    BrowserAnimationsModule,
    MessageModule,
    UserModule,
    UserSettingFormModule,
    CustomersModule,
    AppRoutingModule 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
