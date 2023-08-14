import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from '../models/auth/authentication';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomResponse } from '../models/responses/custom-response';
import { User } from '../models/entities/user';
import { AuthToken } from '../models/auth/auth-token';
import { TokenResponse } from '../models/responses/token-response';
import { Response } from '../models/base/response';
import { Properties } from '../constants/properties';
import { Router } from '@angular/router';
import { SignalRService } from './signalr/signalr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${Properties.URL}/User`;

  constructor(
    private httpClient: HttpClient,
    private signalRService: SignalRService,
    private router: Router
  ) { }

  register = (authentication: Authentication): Observable<CustomResponse<string>> => {
    const url = this.baseUrl + "/Register";
    return this.httpClient.post<CustomResponse<string>>(url, authentication)
  }

  login = (authentication: Authentication): Observable<TokenResponse<User> & CustomResponse<Response>> => {
    const url = this.baseUrl + "/Login";
    return this.httpClient.post<TokenResponse<User> & CustomResponse<Response>>(url, authentication);
  }

  logout = ( ) => {
    localStorage.clear();
    this.signalRService.off();
    this.router.navigate(["/login"])
  }

  refreshToken = async () => {    
    const tokenExpires = new Date(localStorage.getItem("token-expires") || "")
    const now = new Date()
    if (now < tokenExpires) return;
    const refreshToken = localStorage.getItem("refresh-token") || "";
    const currentUser = localStorage.getItem("current-user");
    const user = <User>JSON.parse(currentUser || "");
    const userId = user.Id
    const params = new HttpParams().appendAll({ userId, refreshToken })
    const url = this.baseUrl + "/RefreshToken";
    await firstValueFrom(this.httpClient.post<TokenResponse<User> & CustomResponse<Response>>(url, null, {
      params: params
    })).then(response => {
      console.log(response);
      localStorage.setItem("token", response.AuthToken.Token);
      localStorage.setItem("token-expires", response.AuthToken.Expires.toString());
      localStorage.setItem("refresh-token", response.RefreshToken.Token);
    })
  }

  search = (username: string): Observable<User[]> => {
    const url = this.baseUrl + "/Search";
    const params = new HttpParams().append("username", username);
    return this.httpClient.get<User[]>(url, { params: params })
  }

  getUsers = (): Observable<User[]> => {
    const url = this.baseUrl + "/Users";
    return this.httpClient.get<User[]>(url)
  }
}
