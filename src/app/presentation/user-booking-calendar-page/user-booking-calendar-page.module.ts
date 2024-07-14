import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingCalendarPagePageRoutingModule } from './user-booking-calendar-page-routing.module';

import { UserBookingCalendarPagePage } from './user-booking-calendar-page.page';
import { NgCalendarModule } from 'ionic7-calendar';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookingCalendarPagePageRoutingModule,
    NgCalendarModule
  ],
  declarations: [UserBookingCalendarPagePage]
})
export class UserBookingCalendarPagePageModule {}
