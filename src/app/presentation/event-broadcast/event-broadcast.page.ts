import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-event-broadcast',
  templateUrl: './event-broadcast.page.html',
  styleUrls: ['./event-broadcast.page.scss'],
})
export class EventBroadcastPage implements OnInit {

  @ViewChild('eventBroadcastModal') eventModal!: IonModal;

  tableStyle = 'material';
  data:any = [];
  loaded:boolean = false;
  userId: string = 'user_id_placeholder';
  showStart:boolean = false;
  showEnd:boolean = false;
  newEventBroadcast:any = {
    title: '',
    description: '',
    upload: '',
    broadcast: [],
    allDay: false,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    type: ''
  };

  broadcastsAvailable: any = ['email','instagram','whatsapp'];

  constructor(
    private localStoage: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });
    loading.present();

    // this.loadEvents();
  }

  loadImageFromDevice(event: any): void {
		
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		
		reader.onload = () => {
		console.log("reader.result", reader.result);
			this.newEventBroadcast.upload = reader.result;
		};
	
		reader.onerror = (error) => {
	
			//handle errors
	
		};
	};


  public async open(row: any) {
		console.log(row);
	}

  //THIS CODE IS DUPLICATED AND NEEDS TO BE EXTRACTED TO A SERVICE

  public async loadEvents() {
    let events = this.fetchAll(this.userId);

    await this.localStoage.get(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}-loaded`).then((data) => {
        this.loaded = data;
    });

    console.log("they say its loaded", this.loaded);

    if(this.loaded) {
        await this.localStoage.get(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`).then((data) => {
           console.log("dat6a",data.length);
           this.data = data;
        });

        if(this.data.length < events.length) {
            console.log("event source not in sync with events from api");
            this.data = events;
            await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, events).then(() => {
                this.loaded = true;
            });
        }

    } else {
        await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, events).then(() => {
            this.loaded = true;
        });

        await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}-loaded`, true);

        this.data = events;
    }
    return;
  }

  private fetchAll(userId: string) {
    let events = this.eventService.getAll(userId);

    console.log("events in controller", events);

    return events;
  }

  startChanged(value: any) {
    this.newEventBroadcast.startTime = value;
  }

  endChanged(value: any) {
    this.newEventBroadcast.endTime = value;
  }

  async scheduleEvent() {
    console.log(this.newEventBroadcast);
    return;
    const event: any = {
        title: this.newEventBroadcast.title,
        allDay: this.newEventBroadcast.allDay,
        startTime: new Date(this.newEventBroadcast.startTime),
        endTime: new Date(this.newEventBroadcast.endTime),
    }

    console.log("wrtf", this.newEventBroadcast.startTime);

    this.newEventBroadcast = {
      title: '',
      description: '',
      upload: '',
      broadcast: ['email','instagram','whatsapp'],
      allDay: false,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    };

    console.log(this.data);
    
    if (!this.data) {
        this.data = [];
    }

    this.data.push(event);

    await this.localStoage.set(`${this.localStoage.STORAGE_KEY_EVENTS}-${this.userId}`, this.data);

    this.saveEvent(event, this.userId);

    this.eventModal.dismiss();

    console.log("event to add", event);
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

}
