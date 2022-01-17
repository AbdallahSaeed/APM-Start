import { Injectable } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser!: User | null;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  redirectUrl!:string;
  
  constructor(private Router: Router, private messageService: MessageService) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
  }

  logout(): void {
    this.currentUser = null;
  }

  checkAuthentication():void{
    if(!this.isLoggedIn){
      this.Router.navigate(['Login']);
    }
  }

}
