import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login.component';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: 'Login', component: LoginComponent },
        { path: 'Home', component: WelcomeComponent, canActivate: [AuthGuard] },
        {
          path: 'products',
          canActivate: [AuthGuard],
          //canLoad: [AuthGuard],
          data:{preload:true},
          loadChildren: () =>
            import('./products/product.module').then((m) => m.ProductModule),
        },
        { path: '', redirectTo: 'Home', pathMatch: 'full' },
        //--- ** == 404
        { path: '**', component: PageNotFoundComponent },
      ],
      { 
        //  enableTracing: true,
         preloadingStrategy: SelectiveStrategy }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
