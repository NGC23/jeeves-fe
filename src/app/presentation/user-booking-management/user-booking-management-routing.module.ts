import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingManagementPage } from './user-booking-management.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingManagementPageRoutingModule {}
