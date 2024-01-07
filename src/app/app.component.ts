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
      title: 'Payments',
      url: '/payments', 
      icon: 'cash' 
    },
    { 
      title: 'Events',
      url: '/events', 
      icon: 'calendar' 
    },
    { 
      title: 'Event Broadcast',
      url: '/event-broadcast', 
      icon: 'send' 
    },
    { 
      title: 'Contacts',
      url: '/contacts', 
      icon: 'person' 
    },
    { 
      title: 'Templates',
      url: '/templates', 
      icon: 'document' 
    },
    { 
      title: 'Settings',
      url: '/settings', 
      icon: 'settings' 
    },
    { 
      title: 'Logout',
      url: '/logout', 
      icon: 'exit' 
    }
  ];
  
  constructor() {}
}
