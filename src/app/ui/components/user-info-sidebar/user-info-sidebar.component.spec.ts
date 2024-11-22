import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoSidebarComponent } from './user-info-sidebar.component';

describe('UserInfoSidebarComponent', () => {
  let component: UserInfoSidebarComponent;
  let fixture: ComponentFixture<UserInfoSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
