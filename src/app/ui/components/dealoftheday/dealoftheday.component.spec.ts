import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealofthedayComponent } from './dealoftheday.component';

describe('DealofthedayComponent', () => {
  let component: DealofthedayComponent;
  let fixture: ComponentFixture<DealofthedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealofthedayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealofthedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
