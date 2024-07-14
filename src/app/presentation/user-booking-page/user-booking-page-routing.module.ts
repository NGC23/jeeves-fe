import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingPagePage } from './user-booking-page.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingPagePageRoutingModule {}
