 
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customer.component';

 

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: "Customers" , component:  CustomerComponent },
    ] ),
    
  
  ],
})
export class CustomersModule {}
