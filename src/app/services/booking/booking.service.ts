import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private BASE_URL: string = `${SERVER_URL}/bookings`;

  constructor(private httpClient: HttpClient) { }

  public create(booking: any): Observable<any> 
  {
    return this.httpClient.post(`${this.BASE_URL}/create`, {
      userId: booking.userId,
      eventId: booking.eventId,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookerDetails: {
        bookerId: booking.bookerId,
        firstName: booking.firstName,
        lastName:  booking.lastName,
        cellNumber:  booking.cellNumber,
        email:  booking.email,
      }
    });
  }

  public reschedule(booking: any): Observable<any> 
  {
    return this.httpClient.patch(`${this.BASE_URL}/reschedule`, {
      id: booking.id,
      userId: booking.userId,
      eventId: booking.eventId,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
  }

  public async getAllBookings(userId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/${userId}`).toPromise();
  }

  public async getAllBookingsByBookerId(bookerId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/booker/${bookerId}`).toPromise();
  }

  public async getById(bookingId: string): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/details/${bookingId}`).toPromise();
  }

  public async cancel(bookingId: string): Promise<any> 
  {
    return this.httpClient.delete(`${this.BASE_URL}/delete/${bookingId}`).toPromise();
  }

  public async getAllBookingsForEventAndUserId(
    userId: string,
    eventId: string,
  ): Promise<any> 
  {
    return this.httpClient.get(`${this.BASE_URL}/${userId}/${eventId}`).toPromise();
  }
}
