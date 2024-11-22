import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoOrdersComponent } from './user-info-orders.component';

describe('UserInfoOrdersComponent', () => {
  let component: UserInfoOrdersComponent;
  let fixture: ComponentFixture<UserInfoOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
