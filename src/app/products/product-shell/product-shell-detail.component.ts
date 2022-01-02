import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../Product';
import { ProductHttpSercice } from '../product-http-sercice';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'pm-product-shell-detail',
  templateUrl: './product-shell-detail.component.html',
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product Detail';

  product!: IProduct | null;
  sub!: Subscription;

  constructor(private productService: ProductHttpSercice) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    // timer(0,1000).subscribe(t=> console.log(this.product))
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => (this.product = selectedProduct)
    );
  }
}
