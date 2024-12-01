import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RescheduleEventPage } from './reschedule-event.page';

describe('RescheduleEventPage', () => {
  let component: RescheduleEventPage;
  let fixture: ComponentFixture<RescheduleEventPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RescheduleEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
