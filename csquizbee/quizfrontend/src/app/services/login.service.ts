import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }


  //Token Generation
  public generateToken(loginData:any) {

    return this.http.post(`${baseUrl}/generate-token`, loginData);

  }

  //Store token in Local Storage
  public loginUser(token) {
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
  public setUser(user) {
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
  let user = this.getUser();
  return user.authorities[0].authority;
}

