import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingPageViewPageRoutingModule } from './user-booking-page-view-routing.module';

import { UserBookingPageViewPage } from './user-booking-page-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserBookingPageViewPageRoutingModule
  ],
  declarations: [UserBookingPageViewPage]
})
export class UserBookingPageViewPageModule {}
