import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoReviewsComponent } from './user-info-reviews.component';

describe('UserInfoReviewsComponent', () => {
  let component: UserInfoReviewsComponent;
  let fixture: ComponentFixture<UserInfoReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
