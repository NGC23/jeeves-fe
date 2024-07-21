import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingDetailPage } from './user-booking-detail.page';

describe('UserBookingDetailPage', () => {
  let component: UserBookingDetailPage;
  let fixture: ComponentFixture<UserBookingDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
