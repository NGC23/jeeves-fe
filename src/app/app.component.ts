import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public appPages = [
    { 
      title: 'Calendar',
      url: '/calendar', 
      icon: 'calendar' 
    },
    { 
      title: 'Event Broadcast',
      url: '/event-broadcast', 
      icon: 'send' 
    },
    { 
      title: 'Events',
      url: '/events', 
      icon: 'calendar' 
    },
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
    // { 
    //   title: 'Payments',
    //   url: '/payments', 
    //   icon: 'cash' 
    // },
    // { 
    //   title: 'Settings',
    //   url: '/settings', 
    //   icon: 'settings' 
    // },
    { 
      title: 'Logout',
      url: '/logout', 
      icon: 'exit' 
    }
  ];
  
  constructor() {}
}
