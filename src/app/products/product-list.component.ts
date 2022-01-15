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
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductHttpSercice,
    private productParameterService: ProductParameterService
  ) {}

  @ViewChild(CriteriaComponent)
  filterElement!: CriteriaComponent;

  ngAfterViewInit(): void {
    ///// Value Change observable
    // this.filterElement.valueChanges?.subscribe(() =>
    //   this.PreformFilter(this.listFilter)
    // );

    // console.log(this.filterElementsref_1);
    // console.log(this.filterElementsref_2);

    this.parentFilterValue = this.productParameterService.filterBy;
    this.filterElement.listFilter = this.productParameterService.filterBy;
  }

  //--- lifecycle hooks
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.PreformFilter(this.productParameterService?.filterBy);
        //this.filterElement.listFilter = this.productParameterService.filterBy;

        //this.filteredProducts = this.products;
        //// if you want defult value for filters
        // this.listFilter = 'cart';
      },
      error: (eer) => (this.errorMessage = eer),
    });
  }

  // @ViewChild(NgModel)
  // filterElement!: NgModel;

  // @ViewChildren('filterElement , nameFilter')
  // filterElementsref_1!: QueryList<ElementRef>;

  // @ViewChildren(NgModel)
  // filterElementsref_2!: QueryList<NgModel>;

  private errorMessage: string = '';
  incloudDetail: boolean = true;

  pageTitle: string = 'Product List !';
  imageWidth: number = 50;
  imageMargin: number = 2;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  filteredProducts: IProduct[] = [];

  private _parentFilterValue!: string;
  get parentFilterValue() {
    return this._parentFilterValue;
  }
  set parentFilterValue(value) {
    this._parentFilterValue = value;
  }

  // filterName!: string;
  // listFilter: string = '';

  ////  getter and setter to bind data
  // private _listFilter!: string;

  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //   this._listFilter = value;

  //   this.filteredProducts = this.listFilter
  //     ? this.PreformFilter(this.listFilter)
  //     : this.products;
  // }

  filterOnChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.parentFilterValue = value;
    this.PreformFilter(value);
  }

  private PreformFilter(filterby: string): void {
    if (filterby) {
      filterby = filterby?.toLowerCase();

      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName.toLowerCase().indexOf(filterby) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }

    console.log(this.filteredProducts);
  }

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Ploduct List: ' + message;
  }
}
