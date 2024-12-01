import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingPageViewPage } from './user-booking-page-view.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingPageViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingPageViewPageRoutingModule {}
