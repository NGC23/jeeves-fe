import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/auth/authguard/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    loadChildren: () => import('./presentation/calendar/calendar.module').then( m => m.CalendarPageModule),
    // canActivate: [AuthguardService],
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
  },
  {
    path: 'bookings',
    loadChildren: () => import('./presentation/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'events/:id',
    loadChildren: () => import('./presentation/user-booking-page/user-booking-page.module').then( m => m.UserBookingPagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./presentation/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register/:type',
    loadChildren: () => import('./presentation/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'event/book/:id/:userId',
    loadChildren: () => import('./presentation/user-booking-calendar-page/user-booking-calendar-page.module').then( m => m.UserBookingCalendarPagePageModule)
  },
  {
    path: 'booking/create/:id/:userId',
    loadChildren: () => import('./presentation/user-booking-form/user-booking-form.module').then( m => m.UserBookingFormPageModule)
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./presentation/thank-you/thank-you.module').then( m => m.ThankYouPageModule)
  },
  {
    path: 'booking/view/:id',
    loadChildren: () => import('./presentation/booking-detail/booking-detail.module').then( m => m.BookingDetailPageModule)
  },
  {
    path: 'booking/details/:id',
    loadChildren: () => import('./presentation/user-booking-detail/user-booking-detail.module').then( m => m.UserBookingDetailPageModule)
  },
  {
    path: 'booker/bookings',
    loadChildren: () => import('./presentation/user-booking-management/user-booking-management.module').then( m => m.UserBookingManagementPageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./presentation/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'booking/view/:eventId/:bookingId',
    loadChildren: () => import('./presentation/user-booking-page-view/user-booking-page-view/user-booking-page-view.module').then( m => m.UserBookingPageViewPageModule)
  },
  {
    path: 'booking/cancel/:id',
    loadChildren: () => import('./presentation/booking-canceled/booking-canceled/booking-canceled.module').then( m => m.BookingCanceledPageModule)
  },
  {
    path: 'booking/update/:userId/:eventId/:bookingId',
    loadChildren: () => import('./presentation/reschedule-event/reschedule-event.module').then( m => m.RescheduleEventPageModule)
  },
  {
    path: 'calendar-settings/:userId',
    loadChildren: () => import('./presentation/calendar-settings/calendar-settings.module').then( m => m.CalendarSettingsPageModule)
  },
  {
    path: 'user-settings/:userId',
    loadChildren: () => import('./presentation/user-profile-form/user-profile-form/user-profile-form.module').then( m => m.UserProfileFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
