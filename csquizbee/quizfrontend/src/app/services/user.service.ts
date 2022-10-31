import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 

  }

  //add user
  public addUser(user:any) {
    return this.http.post(`${baseUrl}/user/`,user);
  }
}
