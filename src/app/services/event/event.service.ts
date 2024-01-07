import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private BASE_URL: string = 'http://127.0.0.1:8081/events';

  constructor(private httpClient: HttpClient) { }

  public getAll(userId: string): Array<any> {
    let events: any[] = [];
    this.httpClient.get(`${this.BASE_URL}/${userId}`).subscribe((data: any) => {
      for(let i = 0; i < data.length; i++) {
          events.push(
              {
                  id: data[i].id,
                  title: data[i].name,
                  allDay: false,
                  startTime: new Date(data[i].start_date),
                  endTime: new Date(data[i].end_date),
                  description: data[i].description,
                  userId: userId  
              }
          );
      }
    });

    console.log("events in service", events);
    return events;
  }

  public create(event: any): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/create`, {
      name: event.name,
      description: event.description,
      start_date: event.start_date,
      end_date: event.end_date,
      user_id: event.user_id,
    })
      .pipe(
        catchError((err) => { throw(err) })
      )
  }
}
