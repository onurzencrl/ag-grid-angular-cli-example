import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoChangePasswordComponent } from './user-info-change-password.component';

describe('UserInfoChangePasswordComponent', () => {
  let component: UserInfoChangePasswordComponent;
  let fixture: ComponentFixture<UserInfoChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
