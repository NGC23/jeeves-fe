import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingDetailPage } from './user-booking-detail.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingDetailPageRoutingModule {}
