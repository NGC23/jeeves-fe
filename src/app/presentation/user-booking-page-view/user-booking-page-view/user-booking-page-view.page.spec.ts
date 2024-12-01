import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingPageViewPage } from './user-booking-page-view.page';

describe('UserBookingPageViewPage', () => {
  let component: UserBookingPageViewPage;
  let fixture: ComponentFixture<UserBookingPageViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingPageViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
