import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'Pm-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /**
   *
   */
  constructor(private Router: Router, private authService: AuthService) {}

  pageTitle: string = 'ACME Product Mangement';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string | undefined {
    return this.authService.currentUser?.userName;
  }

  logOut(): void {
    this.authService.logout();
    this.Router.navigateByUrl('Login');
  }
}
