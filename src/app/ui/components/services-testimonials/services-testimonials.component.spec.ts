import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTestimonialsComponent } from './services-testimonials.component';

describe('ServicesTestimonialsComponent', () => {
  let component: ServicesTestimonialsComponent;
  let fixture: ComponentFixture<ServicesTestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesTestimonialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
