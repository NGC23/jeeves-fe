import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {

  form!: FormGroup;

  buttonTitle: string = "Create Event";
  pageTitle: string = "Create Event";

  id: string = '';

  event: any = {};
  showStart:boolean = false;
  showEnd:boolean = false;
  allDay:boolean = false;
  startTime: string = new Date().toISOString();
  endTime: string = new Date().toISOString();
  
  userId: string = '1'; //testing
  defaultHref: string = '';

  constructor(
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
  ) { }

  //@todo: add validation rules to variable that we only have one set to maintain as this is room for failure
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log("WTF????");
    this.form = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      // startDate: new FormControl(this.startTime),
      // endDate: new FormControl(this.endTime),
    });

    if (this.id !== '') {
      await this.fetchEvent(this.id, this.userId);
      //set page properties
      this.buttonTitle = "Update Event";
      this.pageTitle = "Update Event";
      //set form values for update
      this.startTime = this.event.startTime;
      this.endTime = this.event.endTime;
      this.form = new FormGroup({
        name: new FormControl(
          this.event.title,
          Validators.compose([
            Validators.required
          ])
        ),
        description: new FormControl(
          this.event.description,
          Validators.compose([
            Validators.required
          ])
        ),
        // startDate: new FormControl(this.startTime),
        // endDate: new FormControl( this.endTime),
      });

    }
  }

  ionViewDidEnter() {
    //@TODO:create service to capture previous url and add here. Easy
    this.defaultHref = `/events`;
  }

  async onSubmit() {

    if(!this.form.valid) {
      await this.displayMessage("Issue creating Event, please ensure all values are filled in correctly", "warning-outline");
      return;
    }

    if (this.id !== '') {
      this.update(
        this.form.value,
        this.userId,
        this.id
      );
      return;
    }

    this.save(
      this.form.value, 
      this.userId
    );
  }

  startChanged(value: any) {
    this.startTime = value;
  }

  endChanged(value: any) {
      this.endTime = value;
  }

  private update(
    event: any, 
    userId: string,
    id: string
  ): void {
    this.eventService.update({
        id: id,
        name: event.name,
        description: event.description,
        all_day: this.allDay,
        user_id: userId,
    }).subscribe({
      error: (e) => console.error(e),
      complete: () => {
        console.info('complete')
        console.info('we will now navigate to prior url')
        this.router.navigateByUrl(`/events`);
      } 
    });
  }

  private save(
    event: any, 
    userId: string
  ): void {
    this.eventService.create({
        name: event.name,
        description: event.description,
        all_day: this.allDay,
        user_id: userId,
    }).subscribe({
      error: async (e) => {
        await this.displayMessage("Issue creating Event, if issue persists please contact support", "warning-outline");
        console.error(e)
      },
      complete: async () => {
        console.info('complete')
        console.info('we will now navigate to prior url')
        await this.displayMessage("Event Created Succesfully!");
        this.router.navigateByUrl(`/events`);
      } 
    });
  }

  private async fetchEvent(
    id: string, 
    userId: string
  ): Promise<any> {
    await this.eventService.getById(id, userId).then((data: any) => {
      this.event = {
        id: data.id,
        title: data.name,
        allDay: false,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
        userId: data.user_id  
      };
    });
  }

  async displayMessage(
    msg: string, 
    icon : string = 'checkmark-circle'
  ): Promise<void> {
		const toast = await this.toastController.create({
			message: msg,
			duration: 3000,
      icon: icon,
			// cssClass: 'custom-toast',
			buttons: [
				{
					text: 'Dismiss',
					role: 'cancel'
				}
			],
		});

		await toast.present();
	}
}
