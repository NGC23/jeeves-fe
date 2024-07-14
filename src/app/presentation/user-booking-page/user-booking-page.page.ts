import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-user-booking-page',
  templateUrl: './user-booking-page.page.html',
  styleUrls: ['./user-booking-page.page.scss'],
})
export class UserBookingPagePage implements OnInit {
  
  tableStyle = 'material';
  data:any = [];
  loaded:boolean = false;
  showStart:boolean = false;
  showEnd:boolean = false;
  userId: string = '';
  newEvent:any = {
    title: '',
    allDay: false,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString()
  };
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStoage: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) { }

  async ngOnInit() {
    this.menuCtrl.enable(false);

    this.userId = this.route.snapshot.paramMap.get('id') ?? '';

    console.info("booking page loaded");
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

  private async fetchAll(userId: string) {
    //set loading
    let loading = await this.loadingCtrl.create({
        message: 'loading...',
    });
    //start loading
    loading.present();

    await this.eventService.getAll(userId).then((data) => {
      console.log("daata", data);
      this.data = data;
    });
    //disminss
    loading.dismiss();
  }

}
