import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './user/login.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'Login', component: LoginComponent },
      { path: 'Home', component: WelcomeComponent },
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      //--- ** == 404
      { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
