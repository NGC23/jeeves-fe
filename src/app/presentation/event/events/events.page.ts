import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild('eventModal') eventModal!: IonModal;
  @ViewChild("table") table: any;
  
  tableStyle = 'material';
  data:any = [];
  loaded:boolean = false;
  userId: string = 'user_id_placeholder';
  showStart:boolean = false;
  showEnd:boolean = false;
  newEvent:any = {
    title: '',
    allDay: false,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString()
  };
  constructor(
    private router: Router,
    private localStoage: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
  }
  
  async ionViewDidEnter(){
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    loading.present();

    await this.loadEvents();

    loading.dismiss();
  }

  public async open(row: any) {
		this.router.navigateByUrl(`/event-detail/${row.id}`);
	}

  public async loadEvents() {
    await this.fetchAll(this.userId);
  }

  startChanged(value: any) {
    this.newEvent.startTime = value;
  }

  endChanged(value: any) {
    this.newEvent.endTime = value;
  }

  private async fetchAll(userId: string) {
    let loading = await this.loadingCtrl.create({
        message: 'loading...',
    });
    loading.present();

    await this.eventService.getAll(userId).then((data) => {
      console.log("data of table",data);
      if(data.length != this.data.length) {
        this.data = data;
      }
    });
    loading.dismiss();
  }
}
