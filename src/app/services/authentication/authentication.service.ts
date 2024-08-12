import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL: string = `${SERVER_URL}/user`;

  constructor(private httpClient: HttpClient) 
  { }

  public login(
    email: string, 
    password: string
  ):  Observable<any>  {
    return this.httpClient.post(`${this.BASE_URL}/login`, {
      email: email,
      password: password
    });
  }

  public register(
    email: string, 
    password: string,
    type: string
  ):  Observable<any>  {
    return this.httpClient.post(`${this.BASE_URL}/register`, {
      email: email,
      password: password,
      type: type
    });
  }
}
