import { Component } from '@angular/core';
import { LocalStorageService } from './services/general/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { FE_URL } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  bookPageUrl: string = `${FE_URL}/events`;
  user:any;
  
  public appPages = [
    { 
      title: 'Bookings',
      url: '/bookings', 
      icon: 'create' 
    },
    { 
      title: 'Calendar',
      url: '/calendar', 
      icon: 'calendar' 
    },
    { 
      title: 'Events',
      url: '/events', 
      icon: 'send' 
    },
    // { 
    //   title: 'Event Broadcast',
    //   url: '/event-broadcast', 
    //   icon: 'rocket' 
    // },
    // { 
    //   title: 'Contacts',
    //   url: '/contacts', 
    //   icon: 'person' 
    // },
    // { 
    //   title: 'Templates',
    //   url: '/templates', 
    //   icon: 'document' 
    // },
    // { 
    //   title: 'Integrations Manager',
    //   url: '/integrations', 
    //   icon: 'settings' 
    // },
    { 
      title: 'Payments',
      url: '/payments', 
      icon: 'cash' 
    },
    { 
      title: 'Settings',
      url: '/settings', 
      icon: 'settings' 
    },
  ];
  
  constructor(
    private router: Router,
    public localStorageService: LocalStorageService,
  ) {
    this.buildBookingPageUrl();
  }

  async buildBookingPageUrl() {
    await this.localStorageService.get("user").then(
      async (data) => {
        console.log("data", data);
        this.user = data;
        this.bookPageUrl = `${this.bookPageUrl}/${data.user.id}`
      }
    );
  }

  async logout() {
    console.log("logged out...");
    await this.localStorageService.clearAll();
    this.router.navigateByUrl("login");
    return;
  }
}
