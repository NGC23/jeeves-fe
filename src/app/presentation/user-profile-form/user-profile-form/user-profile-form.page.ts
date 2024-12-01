import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.page.html',
  styleUrls: ['./user-profile-form.page.scss'],
})
export class UserProfileFormPage implements OnInit {

  form!: FormGroup;
  userId: string = '';
  profileSettings: any = {};

  constructor(
    private router: Router,
		private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) { }

  async ngOnInit() {

    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';

    console.log("userID", this.userId);

    this.form = new FormGroup({
      firstName: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      companyName: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      )
    });

    if (this.userId != "") {
      console.info("userId is set", this.userId);

      await this.settingsService.getProfileSettings(this.userId).then((data) => {
        console.log("profile settings", data);
        this.profileSettings = data;
      });

      console.log("profile settings", this.profileSettings);

      this.form = new FormGroup({
        firstName: new FormControl(
          this.profileSettings.firstName,
          Validators.compose([
            Validators.required
          ])
        ),
        lastName: new FormControl(
          this.profileSettings.lastName,
          Validators.compose([
            Validators.required
          ])
        ),
        email: new FormControl(
          this.profileSettings.email,
          Validators.compose([
            Validators.required
          ])
        ),
        companyName: new FormControl(
          this.profileSettings.companyName,
          Validators.compose([
            Validators.required
          ])
        )
      });
    }
  }

  onSubmit()
  {
    if(!this.form.valid) {
      console.error("invalid form"); //nice alerts will be put in
      return;
    }

    this.settingsService.createProfileSettings(
      {
        userId: this.userId,
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        company_name: this.form.value.companyName,
        email: this.form.value.email
      }
    ) .subscribe({
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
