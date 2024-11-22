import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilteredComponent } from './product-filtered.component';

describe('ProductFilteredComponent', () => {
  let component: ProductFilteredComponent;
  let fixture: ComponentFixture<ProductFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
