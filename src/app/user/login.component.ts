import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../messages/message.service';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage!: string;
  pageTitle = 'Log In';

  constructor(
    private authService: AuthService,
    private Router: Router,
    private messageService: MessageService
  ) {}

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);
      if (this.authService.isLoggedIn) {
        // Navigate to the Product List page after log in.
        // this.Router.navigate(['Home']);
        if (this.authService.redirectUrl) {
          this.Router.navigateByUrl(this.authService.redirectUrl);
        }else{
          this.Router.navigate([
            { outlets: { primary: ['Home'], popup: ['messages'] } },
          ]); // Works
          this.messageService.isDisplayed = true;
        }
       
      } else {
        this.errorMessage = 'Invalid user name or password.';
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
