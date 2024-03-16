import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventBroadcastPage } from './event-broadcast.page';

describe('EventBroadcastPage', () => {
  let component: EventBroadcastPage;
  let fixture: ComponentFixture<EventBroadcastPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EventBroadcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
