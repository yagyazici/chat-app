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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = `${Properties.URL}/User`;

  constructor(
    private httpClient: HttpClient
  ) { }

  register = (authentication: Authentication): Observable<CustomResponse<string>> => {
    const url = this.baseUrl + "/Register";
    return this.httpClient.post<CustomResponse<string>>(url, authentication)
  }

  login = (authentication: Authentication): Observable<TokenResponse<User> & CustomResponse<Response>> => {
    const url = this.baseUrl + "/Login";
    return this.httpClient.post<TokenResponse<User> & CustomResponse<Response>>(url, authentication);
  }

  refreshToken = async () => {
    const tokenExpires = new Date(localStorage.getItem("token-expires") || "");
    const now = new Date();
    if (now < tokenExpires) return;
    const refreshToken = localStorage.getItem("refresh-token") || "";
    const user = <User>JSON.parse(localStorage.getItem("current-user") || "");
    const userId = user.id
    const params = new HttpParams().appendAll({ refreshToken, userId })
    const url = this.baseUrl + "/RefreshToken";
    await firstValueFrom(this.httpClient.post<TokenResponse<User> & CustomResponse<Response>>(url, null, { params: params })).then(response => {
      if (response.isSuccessful) {
        localStorage.setItem("token", response.authToken.token);
        localStorage.setItem("token-expires", response.authToken.expires.toString());
        localStorage.setItem("refresh-token", response.refreshToken.token);
      }
    });
  }

  searchUser = (username: string): Observable<User[]> => {
    const url = this.baseUrl + "/SearchUser";
    var params = new HttpParams().append("username", username);
    return this.httpClient.get<User[]>(url, { params: params })
  }
}
