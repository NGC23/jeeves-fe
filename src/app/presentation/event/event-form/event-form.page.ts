import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  
  userId: string = 'user_id_placeholder'; //testing
  defaultHref: string = '';

  constructor(
    private eventService: EventService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(this.startTime),
      endDate: new FormControl(this.endTime),
    });

    if (this.id !== '') {
      await this.fetchEvent(this.id);
      //set page properties
      this.buttonTitle = "Update Event";
      this.pageTitle = "Update Event";
      //set form values for update
      this.startTime = new Date(this.event.startTime).toISOString();
      this.endTime = new Date(this.event.endTime).toISOString();
      this.form = new FormGroup({
        name: new FormControl(this.event.title),
        description: new FormControl(this.event.description),
        startDate: new FormControl(this.startTime),
        endDate: new FormControl( this.endTime),
      });

    }
  }

  ionViewDidEnter() {
    //@TODO:create service to capture previous url and add here. Easy
    this.defaultHref = `/events`;
  }

  onSubmit() {
    if (this.id !== '') {
      console.log("update");
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

  private save(
    event: any, 
    userId: string
  ) {
    this.eventService.create({
        name: event.name,
        description: event.description,
        start_date: new Date(event.startDate).toISOString().slice(0, 19).replace('T', ' '),
        end_date: new Date(event.endDate).toISOString().slice(0, 19).replace('T', ' '),
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

  private async fetchEvent(id: string) {
    await this.eventService.getById(id).then((data: any) => {
      this.event = {
        id: data.id,
        title: data.name,
        allDay: false,
        startTime: new Date(data.start_date),
        endTime: new Date(data.end_date),
        description: data.description,
        userId: data.user_id  
      };
    });
  }
}
