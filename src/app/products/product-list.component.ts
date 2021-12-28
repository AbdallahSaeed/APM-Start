import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { IProduct } from './Product';
import { ProductHttpSercice } from './product-http-sercice';
import { NgModel } from '@angular/forms';
@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(private productService: ProductHttpSercice) {}
  ngAfterViewInit(): void {
    ///// Value Change observable
    // this.filterElement.valueChanges?.subscribe(() =>
    //   this.PreformFilter(this.listFilter)
    // );

    this.filterElementref.nativeElement.focus();
    console.log(this.filterElementref);
    // console.log(this.filterElementsref_1);
    // console.log(this.filterElementsref_2);
  }

  //--- lifecycle hooks
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
        //// if you want defult value for filters
        // this.listFilter = 'cart';
      },
      error: (eer) => (this.errorMessage = eer),
    });
  }

  @ViewChild('filterElement')
  filterElementref!: ElementRef;

  // @ViewChild(NgModel)
  // filterElement!: NgModel;

  // @ViewChildren('filterElement , nameFilter')
  // filterElementsref_1!: QueryList<ElementRef>;

  // @ViewChildren(NgModel)
  // filterElementsref_2!: QueryList<NgModel>;

  private errorMessage: string = '';
  pageTitle: string = 'Product List !';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: IProduct[] = [];
  // filterName!: string;
  // listFilter: string = '';

  ////  getter and setter to bind data
  private _listFilter!: string;

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
