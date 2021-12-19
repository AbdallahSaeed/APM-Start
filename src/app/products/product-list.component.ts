import { Component, OnInit } from '@angular/core';
import { IProduct } from './Product';
import { ProductService } from './Product.service';

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  //---
  private _productService: ProductService | undefined;
  constructor(private productService: ProductService) {
     
  }

  //--- lifecycle hooks
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next : products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error : eer=> this.errorMessage = eer
    });

  }

  private errorMessage : string = '';
  pageTitle: string = 'Product List !';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[] = [];

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.PreformFilter(this.listFilter)
      : this.products;
  }

  private PreformFilter(filterby: string): IProduct[] {
    filterby = filterby.toLowerCase();

    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLowerCase().indexOf(filterby) !== -1
    );
  }

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Ploduct List: ' + message;
  }
}
