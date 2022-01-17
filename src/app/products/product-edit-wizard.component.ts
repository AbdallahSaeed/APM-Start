import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../messages/message.service';
import { AuthService } from '../user/auth.service';
import { IProduct, IProductResolved } from './Product';
import { ProductHttpSercice } from './product-http-sercice';

@Component({
  templateUrl: './product-edit-wizard.component.html',
  styleUrls: ['./product-edit-wizard.component.css'],
})
export class ProductEditWizardComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage!: string;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return (
      JSON.stringify(this.originalProduct) !==
      JSON.stringify(this.currentProduct)
    );
  }

  private currentProduct!: IProduct | null;
  private originalProduct!: IProduct | null;

  get product(): IProduct | null {
    return this.currentProduct;
  }
  set product(value: IProduct | null) {
    this.currentProduct = value;
    // Clone the object to retain a copy
    this.originalProduct = value ? { ...value } : null;
  }

  constructor(
    private productService: ProductHttpSercice,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.route.data.subscribe((data) => {
      const resolvedData: IProductResolved = data['resolveData'];
      this.errorMessage = resolvedData.errors;
      this.onProductRetrieved(resolvedData.product);
    });
  }

  onProductRetrieved(product: IProduct | null): void {
    this.product = product;
    if (!product) {
      this.pageTitle = 'No product found';
    } else {
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product?.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product) {
      if (this.product.id === 0 || this.product.id == null) {
        // Don't delete, it was never saved.
        this.onSaveComplete(`${this.product.productName} was deleted`);
      } else {
        if (
          confirm(`Really delete the product: ${this.product.productName}?`)
        ) {
          this.productService.deleteProduct(this.product.id).subscribe({
            next: () =>
              this.onSaveComplete(`${this.product?.productName} was deleted`),
            error: (err) => (this.errorMessage = err),
          });
        }
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }

  reset(): void {
    this.dataIsValid = {};
    this.currentProduct = null;
    this.originalProduct = null;
  }

  saveProduct(): void {
    if (this.product) {
      if (this.isValid()) {
        if (this.product.id === 0) {
          this.productService.createProduct(this.product).subscribe({
            next: () =>
              this.onSaveComplete(
                `The new ${this.product?.productName} was saved`
              ),
            error: (err) => (this.errorMessage = err),
          });
        } else {
          this.productService.updateProduct(this.product).subscribe({
            next: () =>
              this.onSaveComplete(
                `The updated ${this.product?.productName} was saved`
              ),
            error: (err) => (this.errorMessage = err),
          });
        }
      } else {
        this.errorMessage = 'Please correct the validation errors.';
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/products']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};
    this.dataIsValid['info'] = false;
    this.dataIsValid['tags'] = false;
    if (this.product) {
      // 'info' tab
      if (
        this.product.productName &&
        this.product.productName.length >= 3 &&
        this.product.productCode
      ) {
        this.dataIsValid['info'] = true;
      }  
      // 'tags' tab
      if (this.product.category && this.product.category.length >= 3) {
        this.dataIsValid['tags'] = true;
      }  
    }
  }
}
