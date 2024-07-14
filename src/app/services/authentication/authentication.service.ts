import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private BASE_URL: string = 'http://127.0.0.1:8080/user';

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
    password: string
  ):  Observable<any>  {
    return this.httpClient.post(`${this.BASE_URL}/register`, {
      email: email,
      password: password
    });
  }
}
