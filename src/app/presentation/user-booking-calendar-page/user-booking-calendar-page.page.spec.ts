import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingCalendarPagePage } from './user-booking-calendar-page.page';

describe('UserBookingCalendarPagePage', () => {
  let component: UserBookingCalendarPagePage;
  let fixture: ComponentFixture<UserBookingCalendarPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingCalendarPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
