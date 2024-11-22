import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilUserOptionsComponent } from './mobil-user-options.component';

describe('MobilUserOptionsComponent', () => {
  let component: MobilUserOptionsComponent;
  let fixture: ComponentFixture<MobilUserOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilUserOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilUserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
