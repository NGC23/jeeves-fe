import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private BASE_URL: string = 'http://127.0.0.1:8081/events';

  constructor(private httpClient: HttpClient) { }

  public async getAll(userId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/${userId}`).toPromise();
  }

  public async getById(id: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/details/${id}`).toPromise();
  }

  public create(event: any): Observable<any> 
  {
    return this.httpClient.post(`${this.BASE_URL}/create`, {
      name: event.name,
      description: event.description,
      created_at: event.created_at,
      start_date: event.start_date,
      end_date: event.end_date,
      user_id: event.user_id,
    });
  }

  public update(event: any): Observable<any>
  {
    return this.httpClient.put(`${this.BASE_URL}/update`, {
      name: event.name,
      description: event.description,
      created_at: event.created_at,
      start_date: event.start_date,
      end_date: event.end_date,
      user_id: event.user_id,
    });
  }

  public delete(id: string): Observable<any> 
  {
    return this.httpClient.delete(`${this.BASE_URL}/delete/${id}`);
  }
}
