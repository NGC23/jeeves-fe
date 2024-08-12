import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking/booking.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit {
  @ViewChild("table") table: any;
  
  tableStyle = 'material';
  data:any = [];
  rows:any = [];
  columns:any = [];
  loaded:boolean = false;
  userId: string = '';
  showStart:boolean = false;
  showEnd:boolean = false;
  
  constructor(
    private router: Router,
    private bookingService: BookingService,
    private localStorage: LocalStorageService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    console.log("test");
  }

  async ionViewDidEnter(){
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
    });

    loading.present();

    await this.localStorage.get("user").then(async (data) => {
      console.log("current logged in user", data);
      this.userId = data.user.id;
      await this.bookingService.getAllBookings(this.userId).then((events) => {
        console.log("events", events);
        this.data = events;
      });
    });
    
    this.data.forEach((eventData: any) => {
      console.log("foreach",eventData);
      this.rows.push({
        id: eventData.id,
        name: eventData.bookerDetails.firstName,
        createdAt: eventData.bookerDetails.createdAt,
      });
    });

    this.columns = [
      {name: "Name", prop: "name"},
      {name: "CreatedAt", prop: "createdAt"},
    ];

    console.log("daaata",this.rows);
    loading.dismiss();
  }
  
  public async open(row: any) {
		this.router.navigateByUrl(`/booking/view/${row.id}`);
	}

}
