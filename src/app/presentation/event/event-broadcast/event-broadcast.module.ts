import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventBroadcastPageRoutingModule } from './event-broadcast-routing.module';

import { EventBroadcastPage } from './event-broadcast.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventBroadcastPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [EventBroadcastPage]
})
export class EventBroadcastPageModule {}
