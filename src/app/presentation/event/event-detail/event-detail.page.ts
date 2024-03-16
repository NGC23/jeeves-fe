import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { EventService } from 'src/app/services/event/event.service';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  id: string = '';
  event: any = {};

  constructor(  
    private route: ActivatedRoute,
    private router: Router,
    private localStoage: LocalStorageService,
    private eventService: EventService,
    private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 1000,
    });
    loading.present();

    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    if (this.id == '') {
      //handle it here by error message or something.
    }

    this.fetchEvent(this.id);
  }

  public delete(id: string) {
    console.log("delete triggered somehow");
    this.eventService.delete(id).subscribe((data:any) => {
      this.router.navigate(["/events"]);
    });
  }

  private fetchEvent(id: string) {
    this.eventService.getById(id).then((data: any) => {
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
