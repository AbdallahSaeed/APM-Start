import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditWizardComponent } from './product-edit-wizard.component';

describe('ProductEditWizardComponent', () => {
  let component: ProductEditWizardComponent;
  let fixture: ComponentFixture<ProductEditWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
