import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent  implements OnInit {
  constructor(private Router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    if(!this.authService.isLoggedIn){
      this.Router.navigate(['Login'])
    }
  }

  get userName(): string | undefined {
    return this.authService.currentUser?.userName;
  }

  public pageTitle = 'Welcome';
}
