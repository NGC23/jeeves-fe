import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-user-booking-page',
  templateUrl: './user-booking-page.page.html',
  styleUrls: ['./user-booking-page.page.scss'],
})
export class UserBookingPagePage implements OnInit {
  
  returnUrl: string = '';
  tableStyle = 'material';
  data:any = [];
  loaded:boolean = false;
  showStart:boolean = false;
  showEnd:boolean = false;
  userId: string = '';
  booker:any=[];
  newEvent:any = {
    title: '',
    allDay: false,
    startTime: new Date().toUTCString(),
    endTime: new Date().toUTCString()
  };
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public menuCtrl: MenuController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });
    
    loading.present();

    this.menuCtrl.enable(false);

    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    
    await this.localStorageService.get("user").then((data:any) => {

      if(!data) {
        console.warn("No user detected");
        return;
      }

      switch(data.user.type) {
        case "booker":
          this.booker = data.user;
          console.info("current booker set", this.booker);
          break;
        case "user":
          console.info("current admin user set, which is type user, we will create property for this soon", data);
          break;
        default:
          console.warn("Invalid user detected");
          this.router.navigateByUrl("login");
          break;
      }
    });
    
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
