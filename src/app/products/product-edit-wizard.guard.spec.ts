import { TestBed } from '@angular/core/testing';

import { ProductEditWizardGuard } from './product-edit-wizard.guard';

describe('ProductEditWizardGuard', () => {
  let guard: ProductEditWizardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductEditWizardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
