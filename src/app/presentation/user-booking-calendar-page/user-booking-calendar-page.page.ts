import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, QueryMode } from 'ionic7-calendar';
import { BookingService } from 'src/app/services/booking/booking.service';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import * as moment from 'moment';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { timeInterval } from 'rxjs';


@Component({
  selector: 'app-user-booking-calendar-page',
  templateUrl: './user-booking-calendar-page.page.html',
  styleUrls: ['./user-booking-calendar-page.page.scss'],
})
export class UserBookingCalendarPagePage implements OnInit {

    @ViewChild(CalendarComponent) userBookingCal!:CalendarComponent;

    userId: string = '';
    duration!: number; //Defualt is 1 hour
    id: string = '';
    bookingId: string = '';
    momentjs: any = moment;

    profileSettings:any = {};

    startHour: number = 7;
    endHour: number = 21;

    calendar = {
        mode: "week" as CalendarMode,
        currentDate: new Date(),
        queryMode: 'remote' as QueryMode,
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'testMDH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'testWDH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        },
        timeInterval: 15
    };

    event: any;

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

    calendarSettings: any = {};

    constructor(
            private localStoage: LocalStorageService,
            private eventService: EventService,
            private bookingService: BookingService,
            private loadingCtrl: LoadingController,
            private router: Router,
            private route: ActivatedRoute,
            public menuCtrl: MenuController,
            private settingsService: SettingsService,

    ) {}
    
    async ngOnInit() 
    {
        this.menuCtrl.enable(false);
        //lets see what we can place here.
        console.log("ngOnInit started user booking calendar page");
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
        this.bookingId = this.route.snapshot.queryParamMap.get('bookingId') ?? '';

        await this.fetchEvent(this.id).then(() => {
            console.log("time interval");
            this.calendar.timeInterval = this.event.eventDetails.duration;
            this.duration =  this.event.eventDetails.duration;
            console.log("cal", this.calendar);
        });

        console.log("ids", this.userId);
        console.log("bookingId", this.bookingId);
    }

    // markDisabled(date: Date) {
    //     return  (date.getDay()==6 || date.getDay()==0);
    // in conjunction with - [markDisabled]="markDisabled"we can disable days, need to create ticket
    // }

    public async ionViewDidEnter(){
        this.newEvent = {
            title: '',
            allDay: false,
            startTime: new Date().toUTCString(),
            endTime: new Date().toUTCString()
        };
        console.log("time",this.newEvent.startTime);
    }

    private async getCalendarSettings(): Promise<void>
    {
        await this.settingsService.getCalendarSettings(this.userId)
            .then((settings) => {
                console.log(parseInt(settings.startHour));
                this.calendarSettings = settings;
                this.startHour = parseInt(this.calendarSettings.startHour);
                this.endHour = parseInt(this.calendarSettings.endHour);
                console.log("calendar settings loaded: ",this.calendarSettings);
            }
        );

        await this.settingsService.getProfileSettings(this.userId).then((data) => {
            console.log("profile data", data);
            this.profileSettings = data;
        });
    }
    
    public async loadEvents() 
    {
        await this.getCalendarSettings().then(async () => {
            await this.fetchAll(this.userId);
            console.log(this.calendarSettings);
        });
    }

    public async onRangeChanged(ev: any) 
    {
        await this.loadEvents().then(() => {
            this.userBookingCal.loadEvents();
            this.userBookingCal.update();
        });
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
        console.log("time2", ev.selectedTime);
        const start = this.momentjs(ev.selectedTime).format("YYYY-MM-DD HH:mm:ss");
        const end = this.momentjs(ev.selectedTime.setMinutes(ev.selectedTime.getMinutes() + this.duration)).format("YYYY-MM-DD HH:mm:ss");
        
        this.newEvent.startTime = start;
        this.newEvent.endTime = end;
        if (this.calendar.mode == "day"  && ev.events.length === 0 || this.calendar.mode == "week" && ev.events.length === 0) {
            if (this.bookingId !== "") {
                console.log("okay weirdness");
                this.router.navigateByUrl(`/booking/update/${this.userId}/${this.id}/${this.bookingId}?&start=${this.newEvent.startTime}&end=${this.newEvent.endTime}`);
                return;
            }
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
        console.log("events", data);
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
    }

    private async fetchEvent(id: string) {
        await this.eventService.getById(id).then((data: any) => {
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
            this.calendar.timeInterval = parseInt(this.event.eventDetails.duration);
        });
    }
}
