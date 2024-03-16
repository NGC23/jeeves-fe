import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
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
    loadChildren: () => import('./presentation/event/events/events.module').then( m => m.EventsPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./presentation/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'event-broadcast',
    loadChildren: () => import('./presentation/event/event-broadcast/event-broadcast.module').then( m => m.EventBroadcastPageModule)
  },
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./presentation/event/event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'event/create',
    loadChildren: () => import('./presentation/event/event-form/event-form.module').then( m => m.EventFormPageModule)
  },
  {
    path: 'event/edit/:id',
    loadChildren: () => import('./presentation/event/event-form/event-form.module').then( m => m.EventFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
