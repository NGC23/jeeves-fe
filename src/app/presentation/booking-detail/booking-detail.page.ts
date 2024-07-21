import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.page.html',
  styleUrls: ['./booking-detail.page.scss'],
})
export class BookingDetailPage implements OnInit {

  booking: any = {
    id: '',
    eventId: '',
    startTime: '',
    endTime: '',
    bookerDetails: {
      id: '',
      cellNumber: '',
      createdAt: '',
      email: '',
      firstName: '',
      lastName: '',
      bookingId: '',
    },
  };
  id: string = '';

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {

    console.log("booking details");
    
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });

    loading.present();
    
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    await this.bookingService.getById(this.id).then((data:any) => {
      console.log("booking data",data);
      this.booking = data;

    });

    loading.dismiss();
    

  } 

  async ionViewWillEnter(){

  }

  private fetchBooking()
  {
    
  }

}
