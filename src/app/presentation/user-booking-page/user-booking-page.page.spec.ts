import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingPagePage } from './user-booking-page.page';

describe('UserBookingPagePage', () => {
  let component: UserBookingPagePage;
  let fixture: ComponentFixture<UserBookingPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
