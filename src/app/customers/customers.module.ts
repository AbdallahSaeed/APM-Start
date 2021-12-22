 
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';

 

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "Customers" , component:  CustomerComponent },
    ] ),
  
  ],
})
export class CustomersModule {}
