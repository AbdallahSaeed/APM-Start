import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProductResolved } from './Product';
import { ProductHttpSercice } from './product-http-sercice';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverService implements Resolve<IProductResolved> {
  constructor(private productService: ProductHttpSercice) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | IProductResolved
    | Observable<IProductResolved>
    | Promise<IProductResolved> {
    let id = route.paramMap.get('id') || 0;
    if (isNaN(+id)) {
      const message = `Product id wasn't number ` + id;
      return of({ product: null, errors: [message] });
    }
    return this.productService
      .getProduct(+id)
      .pipe(
        map((product) => ({ product: product })),
        catchError(error => {
          console.log('error ', error)
          const message = `Retrival errors ` + error;
          return of({ product: null, errors: [message] });
        })
      );
  }
}
