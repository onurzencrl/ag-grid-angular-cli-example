import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaddressesComponent } from './myaddresses.component';

describe('MyaddressesComponent', () => {
  let component: MyaddressesComponent;
  let fixture: ComponentFixture<MyaddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyaddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyaddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
