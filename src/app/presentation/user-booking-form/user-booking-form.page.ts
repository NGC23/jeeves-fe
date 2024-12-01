import { BookingService } from './../../services/booking/booking.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-user-booking-form',
  templateUrl: './user-booking-form.page.html',
  styleUrls: ['./user-booking-form.page.scss'],
})
export class UserBookingFormPage implements OnInit {

  form!: FormGroup;
  id:string = '';
  userId:string = '';
  bookerId:string = '';
  start!:string;
  end!:string;
  event:any = {};
  pageTitle: string = 'Booking Form for: ';
  buttonTitle : string = 'Confirm';

  constructor(
    private menu: MenuController,
    private router: Router,
		private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private eventService: EventService,
    private bookingService: BookingService,
    private localStorageService: LocalStorageService,
  ) { }

  async ngOnInit() {
    this.menu.enable(false);

    this.form = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      cellNumber: new FormControl(''),
      email: new FormControl(''),
      // startDate: new FormControl(this.startTime),
      // endDate: new FormControl(this.endTime),
    });


    await this.localStorageService.get("user").then(async (data:any) => {

      if(!data) {
        const toast = await this.toastController.create({
          message: "Please note you are not logged in, it will be easier to manager bookings when logged in",
          duration: 10000,
          icon: "warning-outline",
          // cssClass: 'custom-toast',
          buttons: [
            {
              text: 'Dismiss',
              role: 'cancel'
            },
            {
              text: 'Login',
              handler: () => {
                this.router.navigateByUrl(`/login`);
              }
            }
          ],
        });
    
        await toast.present();
        console.warn("No user detected, this will just end up in bookings for now, lets see how we will use the information");
        return;
      }

      if (data.user.type === 'booker') {
       this.bookerId = data.user.id;
      }
    });

    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.start = this.route.snapshot.queryParamMap.get('start') ?? '';
    this.end = this.route.snapshot.queryParamMap.get('end') ?? '';

    await this.getEvent(
      this.id, 
      this.userId
    ).then(() => {
      console.log("event to be booked", this.event);
      this.pageTitle = `${this.pageTitle} ${this.event.title}` 
    });

  }

  onSubmit(): void
  {
    this.bookingService.create({
      firstName: this.form.value.name,
      lastName: this.form.value.surname,
      email: this.form.value.email,
      cellNumber: this.form.value.cellNumber,
      startTime: this.start,
      endTime: this.end,
      userId:  this.userId,
      bookerId:  this.bookerId,
      eventId: this.id,
  }).subscribe({
    error: (e) => console.error(e),
    complete: () => {
      console.info('complete')
      console.info('we will now navigate to prior url')
      this.router.navigateByUrl(`/thank-you`);
    } 
  });
  }

  private async getEvent(id: string, userId: string){
    await this.eventService.getById(
      id
    ).then((data: any) => {
      this.event = {
        id: data.id,
        title: data.name,
        description: data.description,
        userId: data.userId  
      };
    });
  }

}
