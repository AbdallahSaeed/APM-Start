import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductHttpSercice } from './product-http-sercice';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { IProduct, IProductResolved } from './Product';
import { NumberValidators } from '../shared/numbers-validators';
import { GenericValidator } from '../shared/generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  //selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  //------------ for Validtion
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  productForm!: FormGroup;
  errorMessage!: string;

  // Defines all of the validation messages for the form.
  // These could instead be retrieved from a file or database.

  displayMessage: { [key: string]: string } = {};
  pageTitle: string = '';
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator!: GenericValidator;

  imageUrl!: string;
  private sub!: Subscription;
  private product!: IProduct;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductHttpSercice
  ) {
    this.validationMessages = {
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

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  //------------ for Validtion
  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.productForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(
          this.productForm
        );
      });
  }

  ngOnDestroy(): void {
    ////--- when read from
    //this.sub.unsubscribe();
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
    imageUrl: null,
  };

  ngOnInit(): void {
    this.productForm = this.fb.group(this.productEditControllers);

    //// Read the product Id from the route parameter
    // this.sub = this.route.paramMap.subscribe((params) => {
    //   let id = params.get('id');
    //   if (id) {
    //     this.getProduct(+id);
    //   }
    // });

    ////--- Read From Resolver Route
    this.route.data.subscribe((data) => {
      const resolvedData: IProductResolved = data['resolveData'];
      this.errorMessage = resolvedData.errors;
      if (resolvedData.product) this.displayProduct(resolvedData.product);
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
    this.imageUrl = this.product.imageUrl;
    // Update the data on the form
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
      // imageUrl: this.product.imageUrl
    });
    this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.productId).subscribe({
          next: () => this.onSaveComplete(),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  deleteTag(i: number) {
    this.tags.removeAt(i);
    //--
    this.tags.markAsDirty();
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.productService.updateProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }
}
