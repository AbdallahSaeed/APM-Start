import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './Product';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpSercice {
  private productsUrl = 'api/products';

  private Products!: IProduct[];

  // currentProduact!: IProduct | null;

  // private selectedProductSource = new Subject<IProduct | null>();
  private selectedProductSource = new BehaviorSubject<IProduct | null>(null);

  selectedProductChanges$ = this.selectedProductSource.asObservable();

  changeSelectedProduct(product: IProduct | null): void {
    this.selectedProductSource.next(product);
  }

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    if (this.Products) {
      return of(this.Products);
    }
    return this.http.get<IProduct[]>(this.productsUrl).pipe(
      tap((data) => (this.Products = data)),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    if (this.Products) {
      const foundItem = this.Products.find((q: IProduct) => q.id == id);
      if (foundItem) {
        this.changeSelectedProduct(foundItem);
        return of(foundItem);
      }
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      tap((data) =>   this.changeSelectedProduct(data) ),
      catchError(this.handleError)
    );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // product.productId = this.Products.length + 1;
    product.id = undefined;
    return this.http
      .post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap((data) => this.Products.push(data)),
        tap((data) =>  this.changeSelectedProduct(data) ),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    debugger;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers }).pipe(
      tap((data) => console.log('deleteProduct: ' + id)),
      tap((data) => {
        const foundIndex = this.Products.findIndex((item) => item.id == id);
        if (foundIndex > -1) {
          this.Products.splice(foundIndex, 1);
          this.changeSelectedProduct(null) ;
        }
      }),
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.productId}`;
    return this.http.put<IProduct>(url, product, { headers }).pipe(
      //   tap(() => console.log('updateProduct: ' + product.productId)),
      // Return the product on an update
      map(() => product),
      tap((data) =>  this.changeSelectedProduct(data)),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    console.log(err);

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
      id: 0,
      productId: 0,
      productName: '',
      productCode: '',
      tags: [''],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: '',
    };
  }
}
