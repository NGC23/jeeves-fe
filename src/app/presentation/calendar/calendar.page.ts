import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ModalController, IonModal, LoadingController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, Step } from 'ionic7-calendar';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { IEvent, QueryMode } from 'ionic7-calendar/calendar.interface';
import { EventService } from 'src/app/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking/booking.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
    
    @ViewChild(CalendarComponent) myCal!:CalendarComponent;

    userId: string = '';
    user: any = {};

    calendar = {
        mode: "month" as CalendarMode,
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
        }
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
        private loadingCtrl: LoadingController,
        private router: Router,
        private route: ActivatedRoute,
        private bookingService: BookingService,
    ) {}
    
    async ngOnInit() 
    {
       //lets see what we can place here.
        console.log("ngOnInit started");
    }
    
    public async loadEvents() 
    {
        await this.localStoage.get("user").then((data) => {
            console.log("lol",data);
            this.userId = data.user.id;
            this.user = data.user;
        });

        await this.fetchAll(this.user.id);
    }

    public async onRangeChanged(ev: any) 
    {
        await this.loadEvents();
        this.myCal.loadEvents();
        this.myCal.update();
    }

    public today() 
    {
        this.myCal.currentDate= new Date();
    }

    public next() 
    {
        this.myCal.slideNext();
    }

    public back() 
    {
        this.myCal.slidePrev();
    }

    public onTimeSelected(ev: {selectedTime: Date; events: any[]}) 
    {
        const selected = new Date(ev.selectedTime);
        
        this.newEvent.startTime = selected.toUTCString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = selected.toUTCString();
        if (this.calendar.mode == "day"  && ev.events.length === 0 || this.calendar.mode == "week" && ev.events.length === 0) {
            this.router.navigateByUrl(`/event/create`);
            return;
        }
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
    }

    public onEventSelected(ev: any) 
    {
        console.log("ev", ev);
        this.router.navigateByUrl(`/booking/view/${ev.id}`);
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
        this.loading = await this.loadingCtrl.create({
            message: 'loading...',
        });

        this.loading.present();

        await this.bookingService.getAllBookings(userId).then((data) => {
            if(data.length != this.eventSource.length) {
                for(let i = 0; i < data.length; i++) {
                    this.eventSource.push(
                        {
                            id: data[i].id,
                            title: `${data[i].eventName} - ${data[i].bookerDetails.firstName} ${data[i].bookerDetails.lastName} `,
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
        
        this.loading.dismiss();
    }
}

