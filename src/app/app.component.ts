import { Component } from '@angular/core';
import { Router,Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animations';
import { MessageService } from './messages/message.service';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'Pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  /**
   *
   */
  constructor(private Router: Router, 
    private authService: AuthService,
    private messageService : MessageService) {
    Router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }
  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  pageTitle: string = 'ACME Product Mangement';
  loading = true;
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string | undefined {
    return this.authService.currentUser?.userName;
  }

  displayMessages(): void {
    // Example of primary and secondary routing together
    // this.router.navigate(['/login', {outlets: { popup: ['messages']}}]); // Does not work
    // this.router.navigate([{outlets: { primary: ['login'], popup: ['messages']}}]); // Works
    this.Router.navigate([{ outlets: { popup: ['messages'] } }]); // Works
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.Router.navigate([{ outlets: { popup: null } }]);
     this.messageService.isDisplayed = false;
  }


  logOut(): void {
    this.authService.logout();
    this.Router.navigateByUrl('Login');
  }
}
