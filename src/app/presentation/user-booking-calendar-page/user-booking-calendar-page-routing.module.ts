import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingCalendarPagePage } from './user-booking-calendar-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingCalendarPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingCalendarPagePageRoutingModule {}
