import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnurTableComponent } from './onur-table.component';

describe('OnurTableComponent', () => {
  let component: OnurTableComponent;
  let fixture: ComponentFixture<OnurTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnurTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnurTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
