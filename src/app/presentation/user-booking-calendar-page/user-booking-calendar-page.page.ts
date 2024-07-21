import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, QueryMode } from 'ionic7-calendar';
import { BookingService } from 'src/app/services/booking/booking.service';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user-booking-calendar-page',
  templateUrl: './user-booking-calendar-page.page.html',
  styleUrls: ['./user-booking-calendar-page.page.scss'],
})
export class UserBookingCalendarPagePage implements OnInit {

  @ViewChild(CalendarComponent) userBookingCal!:CalendarComponent;

  userId: string = '';
  id: string = '';
  momentjs: any = moment;

  calendar = {
      mode: "week" as CalendarMode,
      currentDate: new Date(),
      queryMode: 'remote' as QueryMode
  };

  newEvent: any = {
      title: '',
      allDay: false,
      startTime: new Date().toUTCString(),
      endTime: new Date().toUTCString()
  };

  eventData: Array<any> = [];

  viewTitle: string = '';
  eventSource: any[] = [];
  presentingElement:any = null;

  showStart:boolean = false;
  showEnd:boolean = false;

  formattedStart:string = '';
  formattedEnd:string = '';
  loaded: boolean = false;
  loading!: HTMLIonLoadingElement;

  constructor(
      private localStoage: LocalStorageService,
      private eventService: EventService,
      private bookingService: BookingService,
      private loadingCtrl: LoadingController,
      private router: Router,
      private route: ActivatedRoute,
      public menuCtrl: MenuController
  ) {}
  
  async ngOnInit() 
  {
    this.menuCtrl.enable(false);
     //lets see what we can place here.
      console.log("ngOnInit started user booking calendar page");
      this.id = this.route.snapshot.paramMap.get('id') ?? '';
      this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
      console.log("ids", this.userId, this.id);
  }
  
  public async loadEvents() 
  {
      await this.fetchAll(this.userId);
  }

  public async onRangeChanged(ev: any) 
  {
      await this.loadEvents();
      this.userBookingCal.loadEvents();
      this.userBookingCal.update();
  }

  public today() 
  {
      this.userBookingCal.currentDate= new Date();
  }

  public next() 
  {
      this.userBookingCal.slideNext();
  }

  public back() 
  {
      this.userBookingCal.slidePrev();
  }

  public onTimeSelected(ev: {selectedTime: Date; events: any[]}) 
  {
      const start = this.momentjs(ev.selectedTime).format("YYYY-MM-DD HH:mm:ss");
      const end = this.momentjs(ev.selectedTime.setHours(ev.selectedTime.getHours() + 1)).format("YYYY-MM-DD HH:mm:ss");
      
      this.newEvent.startTime = start;
      this.newEvent.endTime = end;
      if (this.calendar.mode == "day"  && ev.events.length === 0 || this.calendar.mode == "week" && ev.events.length === 0) {
          this.router.navigateByUrl(`/booking/create/${this.id}/${this.userId}?start=${this.newEvent.startTime}&end=${this.newEvent.endTime}`);
          return;
      }
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
  }

  public onEventSelected(ev: any) 
  {
      console.log("ev", ev);
    //   this.router.navigateByUrl(`/event-detail/${ev.id}`);
  }

  public startChanged(value: any) 
  {
      this.newEvent.startTime = value;
  }

  public endChanged(value: any)
  {
      this.newEvent.endTime = value;
  }

  private async fetchAll(userId: string) 
  {
    console.log("executed", userId);
      this.loading = await this.loadingCtrl.create({
          message: 'loading...',
      });

    //   this.loading.present();

      await this.bookingService.getAllBookings(userId).then((data) => {
        if(data.length != this.eventSource.length) {
            for(let i = 0; i < data.length; i++) {
                this.eventSource.push(
                    {
                        id: data[i].id,
                        title: `Booked`,
                        allDay: false,
                        createdAt: new Date(data[i].createdAt),
                        startTime: new Date(data[i].startTime),
                        endTime: new Date(data[i].endTime),
                        bookerName: data[i].bookerDetails.firstName,
                        bookerlastName: data[i].bookerDetails.lastName,
                        userId: userId,
                        icon: "checkmark-done-circle-outline"  
                    }
                );
            }
        }
    });
      
    //   this.loading.dismiss();
  }

}
