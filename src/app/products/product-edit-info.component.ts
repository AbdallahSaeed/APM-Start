import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IProductResolved } from './Product';

@Component({
  selector: 'pm-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css'],
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm!: NgForm;

  errorMessage!: string;
  product!: IProduct;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      if (this.productForm) {
        this.productForm.reset();
      }
      const resolvedData: IProductResolved = data['resolveData'];
      if (resolvedData) {
        this.errorMessage = resolvedData.errors;
        if (resolvedData.product) this.product = resolvedData.product;
      }
    });
  }
}
