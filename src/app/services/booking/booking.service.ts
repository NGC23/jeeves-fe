import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private BASE_URL: string = 'http://127.0.0.1:8080/bookings';

  constructor(private httpClient: HttpClient) { }

  public create(booking: any): Observable<any> 
  {
    return this.httpClient.post(`${this.BASE_URL}/create`, {
      userId: booking.userId,
      eventId: booking.eventId,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookerDetails: {
        firstName: booking.firstName,
        lastName:  booking.lastName,
        cellNumber:  booking.cellNumber,
        email:  booking.email,
      }
    });
  }

  public async getAllBookings(userId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/${userId}`).toPromise();
  }

  public async getAllBookingsForEventAndUserId(
    userId: string,
    eventId: string,
  ): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/${userId}/${eventId}`).toPromise();
  }
}
