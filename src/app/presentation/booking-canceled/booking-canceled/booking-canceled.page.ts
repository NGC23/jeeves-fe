import { BookingService } from 'src/app/services/booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-canceled',
  templateUrl: './booking-canceled.page.html',
  styleUrls: ['./booking-canceled.page.scss'],
})
export class BookingCanceledPage implements OnInit {

  id: string = '';

  constructor(
    private bookingService: BookingService,
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    this.menu.enable(false);

    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });
    loading.present();

    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    await this.bookingService.cancel(this.id);

    loading.dismiss();
  }

}
