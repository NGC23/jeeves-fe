import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileFormPage } from './user-profile-form.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfileFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileFormPageRoutingModule {}
