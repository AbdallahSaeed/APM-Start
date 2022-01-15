import { Component, OnInit } from '@angular/core';
import { IProduct, IProductResolved } from './Product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductHttpSercice } from './product-http-sercice';
import { CoreService } from '../@Core/core-Service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  errorMessage!: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductHttpSercice,
    private router: Router //  private coreService : CoreService
  ) {
    // console.log(this.activeRoute.snapshot.data);
  }

  private getProduct(): void {}

  ngOnInit(): void {
    ////--- Normal Read data
    // let id = this.activeRoute.snapshot.paramMap.get('id');
    // if (id) {
    //   this.productService.getProduct(+id).subscribe({
    //     next: (product) =>
    //       product ? (this.product = product) : this.notFound(),
    //   });
    // }

    ////--- Read From Resolver Route
    const resolvedData: IProductResolved =
      this.activeRoute.snapshot.data['resolveData'];
    this.errorMessage = resolvedData.errors;
    this.onProductRetrieved(resolvedData.product);
  }
  
  onProductRetrieved(product: IProduct | null): void {
    if (product) {
      this.product = product;
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }

  onBack(): void {
    this.router.navigate(['products']);
  }

  notFound(): void {
    this.router.navigate(['ProductNotFound']);
  }
}
