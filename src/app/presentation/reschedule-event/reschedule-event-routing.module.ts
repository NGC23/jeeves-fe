import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RescheduleEventPage } from './reschedule-event.page';

const routes: Routes = [
  {
    path: '',
    component: RescheduleEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RescheduleEventPageRoutingModule {}
