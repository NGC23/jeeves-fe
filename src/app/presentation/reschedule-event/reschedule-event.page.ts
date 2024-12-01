import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'app-reschedule-event',
  templateUrl: './reschedule-event.page.html',
  styleUrls: ['./reschedule-event.page.scss'],
})
export class RescheduleEventPage implements OnInit {
  
  momentjs: any = moment;

  startTime: string = '';
  endTime: string = '';
  eventId: string = '';
  bookingId: string = '';
  userId: string = ''; //this is the owner of the booking, naming needs to improve

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private bookingService: BookingService
  ) { }

  async ngOnInit() {
    this.menuCtrl.enable(false);
    
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });
    
    loading.present();

    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') ?? '';

    this.startTime = this.route.snapshot.queryParamMap.get('start') ?? '';
    this.endTime = this.route.snapshot.queryParamMap.get('end') ?? '';

    //error if times not set, return error

    //update event
    await this.bookingService.reschedule(
      {
        id: this.bookingId,
        userId: this.userId,
        eventId: this.eventId,
        startTime: this.startTime,
        endTime: this.endTime,
      }
    ).subscribe({
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete')
        console.info('we will now navigate to prior url')
        this.router.navigateByUrl(`/booking/view/${this.eventId}/${this.bookingId}?updated=true`);
      } 
    });

    loading.dismiss();
  }

}
