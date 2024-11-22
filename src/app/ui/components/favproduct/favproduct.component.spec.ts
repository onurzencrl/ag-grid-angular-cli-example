import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavproductComponent } from './favproduct.component';

describe('FavproductComponent', () => {
  let component: FavproductComponent;
  let fixture: ComponentFixture<FavproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
