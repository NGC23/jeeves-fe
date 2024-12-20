import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfileFormPageRoutingModule } from './user-profile-form-routing.module';

import { UserProfileFormPage } from './user-profile-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserProfileFormPageRoutingModule
  ],
  declarations: [UserProfileFormPage]
})
export class UserProfileFormPageModule {}
