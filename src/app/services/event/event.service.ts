import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private BASE_URL: string = `${SERVER_URL}/events`;

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
    console.log("prePayment", event.prePayment);
    return this.httpClient.post(`${this.BASE_URL}/create`, {
      name: event.name,
      description: event.description,
      end_date: event.end_date,
      user_id: event.user_id,
      location: event.location,
      prePayment: event.prePayment.toString(),
      slots: event.slots,
      price: event.price,
      duration: event.duration,
      coverImage: event.coverImage
    });
  }

  public update(event: any): Observable<any>
  {
    return this.httpClient.put(`${this.BASE_URL}/update`, {
      id: event.id,
      name: event.name,
      description: event.description,
      end_date: event.end_date,
      user_id: event.user_id,
      location: event.location,
      prePayment: event.prePayment.toString(),
      slots: event.slots,
      price: event.price,
      duration: event.duration,
      coverImage: event.coverImage
    });
  }

  public delete(id: string, userId: string): Observable<any> 
  {
    return this.httpClient.delete(`${this.BASE_URL}/delete/${userId}/${id}`);
  }
}
