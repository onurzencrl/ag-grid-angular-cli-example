import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtAnItemComponent } from './bought-an-item.component';

describe('BoughtAnItemComponent', () => {
  let component: BoughtAnItemComponent;
  let fixture: ComponentFixture<BoughtAnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoughtAnItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoughtAnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
