import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private BASE_URL: string = `${SERVER_URL}/settings`;

  userId: string = '';

  constructor(private httpClient: HttpClient) { }

  public async getCalendarSettings(userId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/calendar/${userId}`).toPromise();
  }

  public async getProfileSettings(userId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/user/profile/${userId}`).toPromise();
  }

  public createProfileSettings(profileSettings: any): Observable<any> 
  {
    return this.httpClient.post(`${this.BASE_URL}/user/profile`, {
      user_id: profileSettings.userId,
      first_name: profileSettings.first_name,
      last_name: profileSettings.last_name,
      company_name: profileSettings.company_name,
      email: profileSettings.email
    });
  }

  public createCalendarSettings(settings: any): Observable<any> 
  {
    return this.httpClient.post(`${this.BASE_URL}/calendar/create`, {
      userId: settings.userId, 
      startHour: settings.startHour, 
      endHour: settings.endHour, 
      startDay: settings.startDay, 
      endDay: settings.endDay, 
    });
  }

  public updateCalendarSettings(settings: any): Observable<any> 
  {
    return this.httpClient.put(`${this.BASE_URL}/calendar/create`, {
      userId: settings.userId, 
      startHour: settings.startHour, 
      endtHour: settings.endtHour, 
      startDay: settings.startDay, 
      endtDay: settings.endtDay, 
    });
  }
}
