import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import * as moment from 'moment';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-user-booking-page-view',
  templateUrl: './user-booking-page-view.page.html',
  styleUrls: ['./user-booking-page-view.page.scss'],
})
export class UserBookingPageViewPage implements OnInit {

  eventId: string = '';
  bookingId: string = '';
  rescheduled: string = '';
  event: any = {};

  booking: any = {
    id: '',
    eventId: '',
    startTime: '',
    endTime: '',
    bookerDetails: {
      id: '',
      cellNumber: '',
      createdAt: '',
      email: '',
      firstName: '',
      lastName: '',
      bookingId: '',
    },
  };

  momentjs: any = moment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStoage: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private bookingService: BookingService,
    private toastController: ToastController
  ) { }

 async ngOnInit() {
    this.menuCtrl.enable(false);
    
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });
    loading.present();

    this.eventId = this.route.snapshot.paramMap.get('eventId') ?? '';
    this.bookingId = this.route.snapshot.paramMap.get('bookingId') ?? '';

    this.rescheduled = (this.route.snapshot.queryParamMap.get('updated')) ?? '';

    if(this.rescheduled !== "" && String(this.rescheduled).toLowerCase() === 'true') {
      await this.displayMessage("Booking Updated"); // rethink primitive alerting
    }

    if (this.bookingId == '') {
      //handle it here by error message or something.
    }

    await this.fetchBooking(this.bookingId);
    await this.fetchEvent(this.eventId);

    loading.dismiss();
  }

  public delete(id: string, userId: string) {
    console.log("delete triggered somehow");
    this.eventService.delete(id, userId).subscribe((data:any) => {
      this.router.navigate(["/events"]);
    });
  }

  private async fetchBooking(id: string) {
    await this.bookingService.getById(id).then((data:any) => {
      console.log("booking",data);
      this.booking = data;

    });
  }

  private fetchEvent(id: string) {
    this.eventService.getById(id).then((data: any) => {
      console.log("event",data);
      this.event = {
        id: data.id,
        title: data.name,
        allDay: false,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
        userId: data.userId,  
        eventDetails: data.eventDetails  
      };
      console.log("event",this.event);

    });
  }

  async displayMessage(
    msg: string, 
    icon : string = 'checkmark-circle'
  ): Promise<void> {
		const toast = await this.toastController.create({
			message: msg,
			duration: 3000,
      icon: icon,
			// cssClass: 'custom-toast',
			buttons: [
				{
					text: 'Dismiss',
					role: 'cancel'
				}
			],
		});

		await toast.present();
	}
}
