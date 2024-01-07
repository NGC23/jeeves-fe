import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ModalController, IonModal, LoadingController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, Step } from 'ionic7-calendar';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { IEvent, QueryMode } from 'ionic7-calendar/calendar.interface';
import { EventService } from 'src/app/services/event/event.service';
// import { format } from 'date-fns';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
    
    @ViewChild(CalendarComponent) myCal!:CalendarComponent;
    @ViewChild('modal') modal!: IonModal;

    calendar = {
        mode: "month" as CalendarMode,
        currentDate: new Date(),
        queryMode: 'remote' as QueryMode
    };

    newEvent: any = {
        title: '',
        allDay: false,
        startTime: new Date(),
        endTime: null
    };

    viewTitle: string = '';
    eventSource: any[] = [];
    presentingElement:any = null;

    showStart:boolean = false;
    showEnd:boolean = false;

    formattedStart:string = '';
    formattedEnd:string = '';
    userId: string = 'user_id_placeholder';
    loaded: boolean = false;

    constructor(
        private localStoage: LocalStorageService,
        private eventService: EventService,
        private loadingCtrl: LoadingController
    ) {}

    async ngOnInit() {
        const loading = await this.loadingCtrl.create({
            message: 'loading...',
            duration: 1000,
        });
        loading.present();
        console.log("ngOnInit");
        await this.loadEvents();
        console.log("ngOnInit after api loading of events, setting to local memory");
    }

    ionViewWillEnter(){
    }

    ionViewDidEnter(){
        if(this.myCal) {
            this.myCal.loadEvents();
            this.myCal.update();
        }
        console.log("ionViewDidEnter")
    }

    async loadEvents() {
            let events = this.fetchAll(this.userId);

            await this.localStoage.get(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}-loaded`).then((data) => {
                this.loaded = data;
            });

            console.log("they say its loaded", this.loaded);


            if(this.loaded) {
                await this.localStoage.get(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`).then((data) => {
                   console.log("dat6a",data.length);
                   this.eventSource = data;
                });

                if(this.eventSource.length < events.length) {
                    console.log("event source not in sync with events from api");
                    this.eventSource = events;
                    await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, events).then(() => {
                        this.loaded = true;
                    });
                }

            } else {
                await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, events).then(() => {
                    this.loaded = true;
                });

                await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}-loaded`, true);
    
                this.eventSource = events;
            }
        return;
    }

    async scheduleEvent() {
        const event: any = {
            title: this.newEvent.title,
            allDay: this.newEvent.allDay,
            startTime: new Date(this.newEvent.startTime),
            endTime: new Date(this.newEvent.endTime),
        }

        console.log("wrtf", this.newEvent.startTime);

        this.newEvent = {
            title: '',
            allDay: false,
            startTime: new Date(),
            endTime: null
        };

        console.log(this.eventSource);
        
        if (!this.eventSource) {
            this.eventSource = [];
        }

        this.eventSource.push(event);

        await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, this.eventSource);

        this.saveEvent(event, this.userId);

        this.myCal.loadEvents();
        this.modal.dismiss();

        console.log("event to add", event);
   }


    onRangeChanged(ev: any) {
        this.loadEvents();
        // this.myCal.loadEvents();
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
        console.log("event source", this.eventSource);
    }

   today() {
        this.myCal.currentDate= new Date();
   }

   next() {
        this.myCal.slideNext();
   }

   back() {
        this.myCal.slidePrev();
   }

   onTimeSelected(ev: {selectedTime: Date; events: any[]}) {
        const selected = new Date(ev.selectedTime);
        
        this.newEvent.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = selected.toISOString();

        if (this.calendar.mode == "day" || this.calendar.mode == "week" && ev.events.length === 0) {
            this.modal.present();
        }
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
    }

    onEventSelected(ev: any) {
        console.log('Event selected:' + ev.startTime + '-' + ev.endTime + ',' + ev.title);
    }

    startChanged(value: any) {
        this.newEvent.startTime = value;
    }

    endChanged(value: any) {
        this.newEvent.endTime = value;
    }

    private saveEvent(event: any, userId: string) {
        this.eventService.create({
            name: event.title,
            description: "There are no notes added to this feature yet",
            start_date: new Date(event.startTime).toISOString().slice(0, 19).replace('T', ' '),
            end_date: new Date(event.endTime).toISOString().slice(0, 19).replace('T', ' '),
            all_day: event.allDay,
            user_id: userId,
        }).subscribe((data) => {
            console.log(data);
        });
    }

    private fetchAll(userId: string) {
        let events = this.eventService.getAll(userId);

        console.log("events in controller", events);

        return events;
    }
}

