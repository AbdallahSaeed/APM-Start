
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpSercice {
    private productsUrl =     'api/products';

    constructor(private http: HttpClient) { }
  
    getProducts(): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.productsUrl)
        .pipe(
         // tap(data => console.log(JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    getProduct(id: number): Observable<IProduct> {
      if (id === 0) {
        return of(this.initializeProduct());
      }
      const url = `${this.productsUrl}/${id}`;
      return this.http.get<IProduct>(url)
        .pipe(
        //  tap(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    createProduct(product: IProduct): Observable<IProduct> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      product.productId = 0;
      return this.http.post<IProduct>(this.productsUrl, product, { headers })
        .pipe(
         // tap(data => console.log('createProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    deleteProduct(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.productsUrl}/${id}`;
      return this.http.delete<IProduct>(url, { headers })
        .pipe(
          tap(data => console.log('deleteProduct: ' + id)),
          catchError(this.handleError)
        );
    }
  
    updateProduct(product: IProduct): Observable<IProduct> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.productsUrl}/${product.productId}`;
      return this.http.put<IProduct>(url, product, { headers })
        .pipe(
       //   tap(() => console.log('updateProduct: ' + product.productId)),
          // Return the product on an update
          map(() => product),
          catchError(this.handleError)
        );
    }
  
    private handleError(err:any): Observable<never> {

      console.log(err)

      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage: string;
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  
    private initializeProduct(): IProduct {
      // Return an initialized object
      return {
        id:0,
        productId: 0,
        productName: '',
        productCode: '',
        tags: [''],
        releaseDate: '',
        price: 0,
        description: '',
        starRating: 0,
        imageUrl: ''
      };
    }
}
