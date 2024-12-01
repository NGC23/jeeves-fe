import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RescheduleEventPageRoutingModule } from './reschedule-event-routing.module';

import { RescheduleEventPage } from './reschedule-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RescheduleEventPageRoutingModule
  ],
  declarations: [RescheduleEventPage]
})
export class RescheduleEventPageModule {}
