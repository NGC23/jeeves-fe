import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingCanceledPage } from './booking-canceled.page';

const routes: Routes = [
  {
    path: '',
    component: BookingCanceledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingCanceledPageRoutingModule {}
