import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingManagementPageRoutingModule } from './user-booking-management-routing.module';

import { UserBookingManagementPage } from './user-booking-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookingManagementPageRoutingModule
  ],
  declarations: [UserBookingManagementPage]
})
export class UserBookingManagementPageModule {}
