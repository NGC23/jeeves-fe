import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userId: string = "";
  calendarSettings: any = {};
  profileSettings: any = {};

  constructor(
    private settingsService: SettingsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private localStorage: LocalStorageService,
  ) { }

  async ngOnInit() {
    console.log("started component and loading calendar settings and related settings");
    this.getSettings();
  }

  private async getSettings(): Promise<void>
  {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 50000
    });

    await this.localStorage.get("user").then(
      async (data) => {
        loading.present();

        console.log("User settings to be loaded", data.user);
        
        this.userId = data.user.id;

        await this.settingsService.getCalendarSettings(this.userId)
          .then((calendarSettings) => {
            console.log("calendar settings loaded: ",calendarSettings);
            this.calendarSettings = calendarSettings;
        });

        await this.settingsService.getProfileSettings(this.userId)
        .then((profileSettings) => {
          console.log("profile settings loaded: ",profileSettings);
          this.profileSettings = profileSettings;
        });

        loading.dismiss();
      }
    );
  }

}
