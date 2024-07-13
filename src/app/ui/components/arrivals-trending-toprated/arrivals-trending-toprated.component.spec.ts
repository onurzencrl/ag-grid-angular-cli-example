import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalsTrendingTopratedComponent } from './arrivals-trending-toprated.component';

describe('ArrivalsTrendingTopratedComponent', () => {
  let component: ArrivalsTrendingTopratedComponent;
  let fixture: ComponentFixture<ArrivalsTrendingTopratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalsTrendingTopratedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrivalsTrendingTopratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
