import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingCanceledPage } from './booking-canceled.page';

describe('BookingCanceledPage', () => {
  let component: BookingCanceledPage;
  let fixture: ComponentFixture<BookingCanceledPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingCanceledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
