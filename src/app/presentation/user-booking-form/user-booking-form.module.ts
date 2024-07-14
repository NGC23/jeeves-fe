import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserBookingFormPageRoutingModule } from './user-booking-form-routing.module';

import { UserBookingFormPage } from './user-booking-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserBookingFormPageRoutingModule
  ],
  declarations: [UserBookingFormPage]
})
export class UserBookingFormPageModule {}
