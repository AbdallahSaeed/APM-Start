import { Component } from '@angular/core';

@Component({
  selector: 'Pm-root',
  template: `
    <div style="text-align:center">
      <h1>Hi! Welcome to {{ pageTital }}!!</h1>
       <pm-products></pm-products>
    </div>
  `,
})
export class AppComponent {
  pageTital: string = 'ACME Product Mangement';
}

