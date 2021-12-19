import { Component, OnInit } from '@angular/core';
import { IProduct } from './Product';
import { Router,  ActivatedRoute } from '@angular/router';
import { ProductService } from './Product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private router : Router
  ) {}

  private getProduct(): void {}

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (product) =>  product ? this.product = product : this.notFound() ,
      });
    } else {
     this.onBack();
    }
  }

  onBack(): void {
    this.router.navigate(['products'])
  }
  notFound(): void {
    this.router.navigate(['ProductNotFound'])
  }
}
