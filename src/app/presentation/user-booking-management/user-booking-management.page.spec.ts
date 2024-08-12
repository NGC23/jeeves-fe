import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingManagementPage } from './user-booking-management.page';

describe('UserBookingManagementPage', () => {
  let component: UserBookingManagementPage;
  let fixture: ComponentFixture<UserBookingManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
