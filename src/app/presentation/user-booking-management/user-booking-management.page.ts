import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking/booking.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-user-booking-management',
  templateUrl: './user-booking-management.page.html',
  styleUrls: ['./user-booking-management.page.scss'],
})
export class UserBookingManagementPage implements OnInit {

  returnUrl: string = '';
  user: any;
  userId: any;
  bookings: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuController,
    public localStorageService: LocalStorageService,
    private bookingService: BookingService,
  ) { }

  async ngOnInit() {
    this.menu.enable(false);
    await this.localStorageService.get("user").then(async (data:any) => {
      console.log("current logged in booker",data);
      this.userId = data.user.id;
      await this.bookingService.getAllBookingsByBookerId(this.userId).then((bookings) => {
        console.log("bookings for user", bookings);
        this.bookings = bookings;
      });
    });

    this.returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl') ?? '';

    if(this.returnUrl !== '') {
      this.router.navigateByUrl(this.returnUrl);
    }
    

  }

}
