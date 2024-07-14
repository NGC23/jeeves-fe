import { LocalStorageService } from 'src/app/services/general/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  //we will do types in future
  user: any;

  form!: FormGroup;
  loading!: HTMLIonLoadingElement;
  
  buttonTitle: string = "Login";
  buttonRegisterTitle: string = "Register";
  pageTitle: string = "Login";

  constructor(
    private menu: MenuController,
    private router: Router,
		private toastController: ToastController,
    public loadingCtrl: LoadingController,
    public localStorageService: LocalStorageService,
    private authService: AuthenticationService,
  ) { }

  async ngOnInit() 
  {
    //Disable menu
    this.menu.enable(false);
    //Create form
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
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

    console.log(this.form);
    this.authService.login(
      this.form.value.email,
      this.form.value.password
    ).subscribe({
      error: (e) => console.error(e),
      next: (value) => {
        console.log("user", value);
        this.user = value;
        this.user.loggedIn = true;
        // very primitive i know and insecure. we will do something different in future, this is poc
      },
      complete: async () => {
        if (this.user.loggedIn === true) {
          console.info('login time');
          await this.localStorageService.set(
            "user",
            { user: this.user, loggedIn: true, test :'tessst' }
          );
          this.menu.enable(true);
          this.router.navigateByUrl(`/calendar`);
        }
      }
    });

 

    this.loading.dismiss();
  }

  public redirectUserToSignUpPage(): void
  {
    this.router.navigateByUrl('/register');
  }

}
