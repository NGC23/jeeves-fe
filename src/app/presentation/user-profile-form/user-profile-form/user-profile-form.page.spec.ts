import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileFormPage } from './user-profile-form.page';

describe('UserProfileFormPage', () => {
  let component: UserProfileFormPage;
  let fixture: ComponentFixture<UserProfileFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserProfileFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
