import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBookingFormPage } from './user-booking-form.page';

describe('UserBookingFormPage', () => {
  let component: UserBookingFormPage;
  let fixture: ComponentFixture<UserBookingFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserBookingFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
