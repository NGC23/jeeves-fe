import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserBookingFormPage } from './user-booking-form.page';

const routes: Routes = [
  {
    path: '',
    component: UserBookingFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserBookingFormPageRoutingModule {}
