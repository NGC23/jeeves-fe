import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import FroalaEditor from 'froala-editor';
import 'froala-editor/js/plugins.pkgd.min.js';

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

  prePayment:boolean = false;
  event: any = {};
  showStart:boolean = false;
  showEnd:boolean = false;
  allDay:boolean = false;
  startTime: string = new Date().toUTCString();
  endTime: string = new Date().toUTCString();
  image:any;
  
  userId: string = '1'; //testing
  defaultHref: string = '';

  public options: Object = {
    listAdvancedTypes: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL', 'formatUL'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL', 'formatUL'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL', 'formatUL'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert','formatOL', 'formatUL'],
  };

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
      location: new FormControl(),
      price: new FormControl(),
      slots: new FormControl(0),
      duration: new FormControl(0),
      prePayment: new FormControl(),
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
        location: new FormControl(this.event.eventDetails.location),
        price: new FormControl(this.event.eventDetails.price),
        slots: new FormControl(this.event.eventDetails.slots),
        duration: new FormControl(this.event.eventDetails.duration),
        prePayment: new FormControl(this.event.eventDetails.prePayment),
        // startDate: new FormControl(this.startTime),
        // endDate: new FormControl( this.endTime),
      });


      console.log("this", this.event);

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

    console.log("form values", this.form.value);

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
        location: event.location,
        prePayment: this.prePayment,
        slots: event.slots,
        price: event.price,
        duration: event.duration,
        coverImage: this.image
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
        location: event.location,
        prePayment: event.prePayment ?? false,
        slots: event.slots,
        price: event.price,
        duration: event.duration,
        coverImage: this.image
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
    await this.eventService.getById(id).then((data: any) => {
      console.log("data", data);
      this.event = {
        id: data.id,
        title: data.name,
        allDay: false,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        description: data.description,
        userId: data.user_id,
        eventDetails: data.eventDetails,  
        coverImage: data.image_url,  
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

  loadImageFromDevice(event:any): void {
		
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		
		reader.onload = () => {
		console.log("reader.result", reader.result);
			this.image = reader.result;
		};
	
		reader.onerror = (error) => {
	
			//handle errors
	
		};
	};
}
