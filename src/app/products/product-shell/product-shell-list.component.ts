import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IProduct } from '../Product';
import { ProductHttpSercice } from '../product-http-sercice';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html',
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Products';
  errorMessage!: string;
  products!: IProduct[];
  selectedProduct!: IProduct | null;

  sub!: Subscription;
  constructor(private productService: ProductHttpSercice) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (p) => (this.selectedProduct = p)
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }
}
