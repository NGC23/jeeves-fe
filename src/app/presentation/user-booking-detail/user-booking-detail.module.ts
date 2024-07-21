import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingDetailPageRoutingModule } from './user-booking-detail-routing.module';

import { UserBookingDetailPage } from './user-booking-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookingDetailPageRoutingModule
  ],
  declarations: [UserBookingDetailPage]
})
export class UserBookingDetailPageModule {}
