import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './products/product.module';

import { UserSettingFormModule } from './user-setting-form/user-setting-form.module';
import { CustomersModule } from './customers/customers.module';
import { MessageModule } from './messages/message.module';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './user/login.component';
import { CoreService } from './@Core/core-Service';


@NgModule({
  declarations: [AppComponent ,  WelcomeComponent, PageNotFoundComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
  
    MessageModule,
    UserModule,
    ProductModule,
    UserSettingFormModule,
    CustomersModule,
    AppRoutingModule 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
