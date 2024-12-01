import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarSettingsPage } from './calendar-settings.page';

describe('CalendarSettingsPage', () => {
  let component: CalendarSettingsPage;
  let fixture: ComponentFixture<CalendarSettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalendarSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
