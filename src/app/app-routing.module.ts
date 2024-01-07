import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./presentation/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./presentation/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./presentation/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./presentation/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'event-broadcast',
    loadChildren: () => import('./presentation/event-broadcast/event-broadcast.module').then( m => m.EventBroadcastPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
