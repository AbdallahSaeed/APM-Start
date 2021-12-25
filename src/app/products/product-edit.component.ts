import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
 
import { ProductHttpSercice } from './product-http-sercice';
import { Subscription } from 'rxjs';
import { IProduct } from './Product';
import { NumberValidators } from "../shared/numbers-validators";
 

@Component({
  //selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  errorMessage!: string;

  // Defines all of the validation messages for the form.
  // These could instead be retrieved from a file or database.
  validationMessages = {
    productName: {
      required: 'Product name is required.',
      minlength: 'Product name must be at least three characters.',
      maxlength: 'Product name cannot exceed 50 characters.',
    },
    productCode: {
      required: 'Product code is required.',
    },
    starRating: {
      range: 'Rate the product between 1 (lowest) and 5 (highest).',
    },
  };

  displayMessage: { [key: string]: string } = {};
  pageTitle: string = '';
  private sub!: Subscription;
  private product!: IProduct;
  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductHttpSercice
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  //---- Form Groups
  private productEditControllers = {
    productName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    productCode: ['', Validators.required],
    starRating: ['', NumberValidators.range(1, 5)],
    tags: this.fb.array([]),
    description: '',
  };

  ngOnInit(): void {
    this.productForm = this.fb.group(this.productEditControllers);

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe((params) => {
      const id = +!params.get('id');
      this.getProduct(id);
    });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product: IProduct) => this.displayProduct(product),
      error: (err) => (this.errorMessage = err),
    });
  }

  displayProduct(product: IProduct): void {
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;
    console.log(product);
    if (this.product.productId === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }
  deleteProduct(): void {}

  deleteTag(i: number) {
    this.tags.removeAt(i);
    //--
    this.tags.markAsDirty();
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  saveProduct(): void {}
}
