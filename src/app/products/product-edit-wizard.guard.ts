import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditWizardComponent } from './product-edit-wizard.component';

@Injectable({
  providedIn: 'root',
})
export class ProductEditWizardGuard
  implements CanDeactivate<ProductEditWizardComponent>
{
  canDeactivate(
    component: ProductEditWizardComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      if (component.isDirty) {
        const productName = component.product?.productName || 'New Product';
        return confirm(`Navigate away and lose all changes to ${productName}?`);
      }
    return true;
  }
}
