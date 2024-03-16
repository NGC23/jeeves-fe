import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, ModalController, IonModal, LoadingController } from '@ionic/angular';
import { CalendarComponent, CalendarMode, Step } from 'ionic7-calendar';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { IEvent, QueryMode } from 'ionic7-calendar/calendar.interface';
import { EventService } from 'src/app/services/event/event.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
    
    @ViewChild(CalendarComponent) myCal!:CalendarComponent;

    calendar = {
        mode: "month" as CalendarMode,
        currentDate: new Date(),
        queryMode: 'remote' as QueryMode
    };

    newEvent: any = {
        title: '',
        allDay: false,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString()
    };

    eventData: Array<any> = [];

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
        private loadingCtrl: LoadingController,
        private router: Router,
    ) {}
    
    ngOnInit() {
        //lets see what we can place here.
    }
    
    public async loadEvents() {
        await this.fetchAll(this.userId);
    }

    public async onRangeChanged(ev: any) {
        await this.loadEvents();
        this.myCal.loadEvents();
        this.myCal.update();
    }

    public today() {
        this.myCal.currentDate= new Date();
    }

    public next() {
        this.myCal.slideNext();
    }

    public back() {
        this.myCal.slidePrev();
    }

    public onTimeSelected(ev: {selectedTime: Date; events: any[]}) {
        const selected = new Date(ev.selectedTime);
        
        this.newEvent.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = selected.toISOString();
        if (this.calendar.mode == "day"  && ev.events.length === 0 || this.calendar.mode == "week" && ev.events.length === 0) {
            this.router.navigateByUrl(`/event-form`);
            return;
        }
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0));
    }

    public onEventSelected(ev: any) {
        console.log("ev", ev);
        this.router.navigateByUrl(`/event-detail/${ev.id}`);
    }

    public startChanged(value: any) {
        this.newEvent.startTime = value;
    }

    public endChanged(value: any) {
        this.newEvent.endTime = value;
    }

    private async fetchAll(userId: string) {
        let loading = await this.loadingCtrl.create({
            message: 'loading...',
        });
        loading.present();

        await this.eventService.getAll(userId).then((data) => {
        if(data.length != this.eventSource.length) {
            for(let i = 0; i < data.length; i++) {
                this.eventSource.push(
                    {
                        id: data[i].id,
                        title: data[i].name,
                        allDay: false,
                        createdAt: new Date(data[i].created_at),
                        startTime: new Date(data[i].start_date),
                        endTime: new Date(data[i].end_date),
                        description: data[i].description,
                        userId: userId  
                    }
                );
              }
            }
        });
        loading.dismiss();
    }
}

