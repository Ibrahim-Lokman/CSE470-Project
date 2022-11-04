import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();


  constructor(private http : HttpClient) { }

  //Current user details 
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }


  //Token Generation
  public generateToken(loginData:any) {

    return this.http.post(`${baseUrl}/generate-token`, loginData);

  }

  //Store token in Local Storage
  public loginUser(token:any) {
    localStorage.setItem('token', token);
    return true;
  }


  //Check if user is logged in
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    } else {
      return true;
    }

  }


  // Logout with removing token from storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //Get token
  public getToken() {
    return localStorage.getItem('token');
  }


  //Set userDetail in local storage
  public setUser(user:any) {
    localStorage.setItem("user", JSON.stringify(user));
  }


  //Get user details from local storage
  public getUser() {
    let userStr = localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //Get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;

  }
}

