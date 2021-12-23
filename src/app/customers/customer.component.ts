import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/// custome Validtion
/*
function rattingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}*/

/// custome Validtion with Pramter
function rattingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

// function emailCompare(
//   c1: AbstractControl | null,
//   c2: AbstractControl | null
// ): ValidatorFn {
//   return (c: AbstractControl): { [key: string]: boolean } | null => {

//     if (c1?.value !== c2?.value) {
//       return { comper: true };
//     }
//     return null;
//   };
// }
function emailCompare(c: AbstractControl): { [key: string]: boolean } | null {
  const emailController = c.get('email');
  const ConfirmEmailController = c.get('confirmEmail');
  if (emailController?.pristine || ConfirmEmailController?.pristine) {
    return null;
  }
  if (emailController?.value === ConfirmEmailController?.value) {
    return null;
  }
  return { "comper": true };
}


@Component({
  //selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  private customer = new Customer();

  customerForm: FormGroup = this.fb.group(this.customer);

  //--- Form Controllers
  private customerControllers = {
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    //--- Nested Form Group and Cross field Validtion
    emailGroup: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail:['', [Validators.required, Validators.email]],
    } , {
      validator: emailCompare
    } ),
    sendCatalog: false,
    addressType: '',
    notifictions: 'email',
    Phone: '',
    Ratting: [null, rattingRange(1, 5)], // custome Validtion
  };

  

  ngOnInit(): void {
    this.customerForm = this.fb.group(this.customerControllers);

    // this.customerForm = new FormGroup({ ...this.customerControllers });
  }

  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm?.value));
  }

  populateTestData(): void {
    /// for update form
    // this.customerForm.setValue({
    //   firstName: 'abdallah',
    //   lastName: 'saeed',
    //   email: 'abdallahSaeed@gmail.com',
    //   sendCatalog: false,
    // });

    this.customerForm.patchValue({
      firstName: 'abdallah',
      lastName: 'saeed',
      email: 'abdallahSaeed@gmail.com',
      sendCatalog: false,
    });
  }

  setNotifictions(notifyVia: string): void {
    const PhoneControler = this.customerForm.get('Phone');
    if (notifyVia === 'text') {
      PhoneControler?.setValidators(Validators.required);
    } else {
      PhoneControler?.clearValidators();
    }
    PhoneControler?.updateValueAndValidity();
  }
}

export class CustomerControllers {
  firstName: FormControl = new FormControl();
  lastName: FormControl = new FormControl();
  email: FormControl = new FormControl();
  sendCatalog: FormControl = new FormControl(true);
  addressType: FormControl = new FormControl();
}

////----------- Template Driven
/* 
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';


@Component({
  //selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  customer = new Customer();

  constructor() { }

  ngOnInit(): void {
  }

  save(customerForm: NgForm): void {
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
*/
