import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-calendar-settings',
  templateUrl: './calendar-settings.page.html',
  styleUrls: ['./calendar-settings.page.scss'],
})
export class CalendarSettingsPage implements OnInit {

  form!: FormGroup;
  days: Array<string> = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  time: Array<string> = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
  userId: string = '';
  settings: any = {};

  constructor(
    private settingsService: SettingsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
  ) { }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';

    console.log("userid", this.userId);

    this.form = new FormGroup({
      start_hour: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      end_hour: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      start_day: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      end_day: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
    });

    if (this.userId !== "") {
      await this.settingsService.getCalendarSettings(this.userId).then((data) => {
        this.settings = data;
      });

      this.form = new FormGroup({
        start_hour: new FormControl(
          this.settings.startHour,
          Validators.compose([
            Validators.required
          ])
        ),
        end_hour: new FormControl(
          this.settings.endHour,
          Validators.compose([
            Validators.required
          ])
        ),
        start_day: new FormControl(
          this.settings.startDay,
          Validators.compose([
            Validators.required
          ])
        ),
        end_day: new FormControl(
          this.settings.endDay,
          Validators.compose([
            Validators.required
          ])
        ),
      });
    }
  }

  onSubmit() {
    console.log("form to submit",this.form.value);
    this.create(this.form.value);
  }

  private create(calendar: any): void
  {
    this.settingsService.createCalendarSettings(
      {
        userId: this.userId, 
        startHour: calendar.start_hour, 
        endHour: calendar.end_hour, 
        startDay: calendar.start_day, 
        endDay: calendar.end_day, 
      }
    )
    .subscribe({
      error: async (e) => {
        await this.displayMessage("Issue configuring settings at this moment", "warning-outline");
        console.error(e)
      },
      complete: async () => {
        console.info('complete')
        console.info('we will now navigate to prior url')
        await this.displayMessage("Settings Configured Succesfully!");
        this.router.navigateByUrl(`/settings/${this.userId}`);
      } 
    });
  }

  private async displayMessage(
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
