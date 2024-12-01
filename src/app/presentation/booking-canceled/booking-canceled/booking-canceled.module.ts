import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingCanceledPageRoutingModule } from './booking-canceled-routing.module';

import { BookingCanceledPage } from './booking-canceled.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingCanceledPageRoutingModule
  ],
  declarations: [BookingCanceledPage]
})
export class BookingCanceledPageModule {}
