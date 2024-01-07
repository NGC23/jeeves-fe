// [eventSource]="eventSource"
// [calendarMode]="calendar.mode"
// [step]="calendar.step"
// [currentDate]="calendar.currentDate"
// (onCurrentDateChanged)="onCurrentDateChanged($event)"
// (onEventSelected)="onEventSelected($event)"
// (onTitleChanged)="onViewTitleChanged($event)"
// (onTimeSelected)="onTimeSelected($event)"
// (onRangeChanged)="onRangeChanged($event)"
// [queryMode]="calendar.queryMode"
 


// <ion-header [translucent]="true">
//   <ion-toolbar>
//     <ion-title slot="end">{{viewTitle}}</ion-title>
//     <ion-row>
//       <ion-col size="6">
//         <ion-button fill="outline" (click)="addEvent()">ADD EVENT</ion-button>
//       </ion-col>
//       <ion-col size="6">
//         <ion-select [(ngModel)]="calendar.mode" style="max-width: 100%">
//           <ion-select-option (ionSelect)="onOptionSelected($event)" *ngFor="let mode of calendarModes" [value]="mode.key">{{mode.value}}
//           </ion-select-option>
//         </ion-select>
//       </ion-col>
//     </ion-row>
//   </ion-toolbar>
// </ion-header>

// <ion-content [fullscreen]="true">

//     <calendar [eventSource]="eventSource"
//       [calendarMode]="calendar.mode"
//       [step]="calendar.step"
//       [currentDate]="calendar.currentDate"
//       (onCurrentDateChanged)="onCurrentDateChanged($event)"
//       (onEventSelected)="onEventSelected($event)"
//       (onTitleChanged)="onViewTitleChanged($event)"
//       (onTimeSelected)="onTimeSelected($event)"
//       (onRangeChanged)="onRangeChanged($event)"
//       [queryMode]="calendar.queryMode"
//       >
//     </calendar>

// </ion-content>






 
 
//  eventSource:any = [];
//     viewTitle: any;
//     isToday?: boolean;
//     selectedDay = new Date();
//     selectedObject: any;

//     calendarModes = [
//         { key: 'month', value: 'Month' },
//         { key: 'week', value: 'Week' },
//         { key: 'day', value: 'Day' },
//     ]

//     calendar = {
//         mode: this.calendarModes[0].key as CalendarMode,
//         step: 30 as Step,
//         queryMode: 'remote' as QueryMode,
//         startingDayWeek: 1,
//         startingDayMonth: 1,
//         currentDate: new Date(),
//         dateFormatter: {
//             formatMonthViewDay: function(date:Date) {
//                 return date.getDate().toString();
//             },
//             formatMonthViewDayHeader: function(date:Date) {
//                 return 'testMDH';
//             },
//             formatMonthViewTitle: function(date:Date) {
//                 return 'testMT';
//             },
//             formatWeekViewDayHeader: function(date:Date) {
//                 return 'testWDH';
//             },
//             formatWeekViewTitle: function(date:Date) {
//                 return 'testWT';
//             },
//             formatWeekViewHourColumn: function(date:Date) {
//                 return 'testWH';
//             },
//             formatDayViewHourColumn: function(date:Date) {
//                 return 'testDH';
//             },
//             formatDayViewTitle: function(date:Date) {
//                 return 'testDT';
//             }
//         }
//     };

//     async ngOnInit() {
//         await this.loadEvents();
//     }

    // constructor(
    // private navController:NavController, 
    // private localStoage: LocalStorageService,
    // private actionSheetCtrl: ActionSheetController,
    // private modalCtrl: ModalController,
    // private eventService: EventService) {}

//     async loadEvents() {
//         this.eventSource = await this.getEvents();
//     }

//     createRandomEvents() {
//         var events = [];
//         for (var i = 0; i < 50; i += 1) {
//             var date = new Date();
//             var eventType = Math.floor(Math.random() * 2);
//             var startDay = Math.floor(Math.random() * 90) - 45;
//             var endDay = Math.floor(Math.random() * 2) + startDay;
//             var startTime;
//             var endTime;
//             if (eventType === 0) {
//                 startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
//                 if (endDay === startDay) {
//                     endDay += 1;
//                 }
//                 endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
//                 events.push({
//                     title: 'All Day - ' + i,
//                     startTime: startTime,
//                     endTime: endTime,
//                     allDay: true
//                 });
//             } else {
//                 var startMinute = Math.floor(Math.random() * 24 * 60);
//                 var endMinute = Math.floor(Math.random() * 180) + startMinute;
//                 startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
//                 endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
//                 events.push({
//                     title: 'Event - ' + i,
//                     startTime: startTime,
//                     endTime: endTime,
//                     allDay: false
//                 });
//             }
//         }
//         return events;
//     }


//     public async getEvents(): Promise<Array<any>> {
//         let data = await this.eventService.getAll("user_id").subscribe(data => {
//             console.log("events from microservice", data);
//             return data;
//         });
//         let events: Array<any> = [];
//         // let data = await this.localStoage.get("events").then((data) => { 
//         //     console.log("events loadeded", data);
//         //     return data; 
//         // });

//         console.log("boo1122221m", data);

//         events.push(data);

//         return events;
//     }

//     public onViewTitleChanged(title: string) {
//         this.viewTitle = title;
//     }

//     public onEventSelected(event: any) {
//         console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
//     }

//     public changeMode(mode: any) {
//         this.calendar.mode = mode;
//     }

//     public onTimeSelected(ev: any) {
//         console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
//         this.selectedDay =  ev.selectedTime;
//         console.log("set the date");
//     }

//     public onCurrentDateChanged(event:Date) {
//         var today = new Date();
//         today.setHours(0, 0, 0, 0);
//         event.setHours(0, 0, 0, 0);
//         this.isToday = today.getTime() === event.getTime();
//     }

//     public async onRangeChanged(ev: any) {
//         await this.loadEvents();
//         console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
//         console.log("event source", this.eventSource);
//     }

//     async addEvent() {
//         const modal = await this.modalCtrl.create({
//             component: EventModalPage,
//             componentProps: {
//               'selectedDay': this.selectedDay
//             }
//           });

//           modal.onDidDismiss().then((data: any) => {
//             if (data !== null) {
//                 console.log('Modal Data : ' + JSON.stringify(data.data));
//                 let eventData = data.data;
//                 let newEvents: Array<any> = [];
//                 newEvents.concat(this.eventSource);

                
//                 console.log("current source", eventData);

//                 eventData.startTime = new Date(eventData.startTime);
//                 eventData.endTime = new Date(eventData.endTime);

//                 newEvents.push(eventData);
//                 this.localStoage.set("events", eventData);

//                 this.saveEvent(eventData);

//                 setTimeout(() => {
//                     this.eventSource = newEvents;
//                 });
//             }
//             this.loadEvents();
//           });
//         return await modal.present();
//     }

//     public onOptionSelected($event: any) {
//         console.log("Option selected" + $event)
//     }

//     private saveEvent(event: any) {
//         this.eventService.create({
//             name: event.title,
//             description: event.notes,
//             start_date: new Date(event.startTime).toISOString().slice(0, 19).replace('T', ' '),
//             end_date: new Date(event.endTime).toISOString().slice(0, 19).replace('T', ' '),
//             user_id: "test-id-will-be-uuid",
//         }).subscribe((data) => {
//             console.log(data);
//         });
//     }