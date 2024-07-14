import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;
  loading!: HTMLIonLoadingElement;
  
  buttonTitle: string = "Register";
  pageTitle: string = "Register";

  constructor(
    private menu: MenuController,
    private router: Router,
		private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService
  ) { }

  async ngOnInit() 
  {
    //Disable menu
    this.menu.enable(false);
    //Create form
    this.form = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      confirmPassword: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
    });
    //Create loader
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
    });

  }

  public async onSubmit(): Promise<void>
  {
    this.loading.present();

    if(!this.form.valid) {
      console.log(this.form);
      this.loading.dismiss();
      await this.displayMessage("Please ensure all fields are filled in", "warning-outline");
      return;
    }

    console.log(this.form);
    this.authService.register(
      this.form.value.email,
      this.form.value.password
    ).subscribe({
      error: async (e) => { 
        await this.displayMessage("Issue creating Profile, if issue persists please contact support", "warning-outline");
        console.error(e)
      },
      next: (value) => {
        console.log("user", value);
      },
      complete: async () => {
        console.info('registered')
        console.info('we will now take you to login')
        await this.displayMessage("Profile Created Succesfully!");
        this.router.navigateByUrl(`/login`);
      } 
    });

    this.loading.dismiss();
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
