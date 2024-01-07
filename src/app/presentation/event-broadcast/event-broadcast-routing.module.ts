import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventBroadcastPage } from './event-broadcast.page';

const routes: Routes = [
  {
    path: '',
    component: EventBroadcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventBroadcastPageRoutingModule {}
