import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authentication } from '../models/auth/authentication';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/responses/custom-response';
import { User } from '../models/entities/user';
import { AuthToken } from '../models/auth/auth-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:5276/User";

  constructor(
    private httpClient: HttpClient
  ) { }

  register = (authentication: Authentication): Observable<CustomResponse<string>> => {
    const url = this.baseUrl + "/Register";
    return this.httpClient.post<CustomResponse<string>>(url, authentication)
  }

  login = (authentication: Authentication): Observable<CustomResponse<User & string>> => {
    const url = this.baseUrl + "/Login";
    return this.httpClient.post<CustomResponse<User & string>>(url, authentication);
  }

  refreshToken = (): Observable<CustomResponse<AuthToken & string>> => {
    const url = this.baseUrl + "/RefreshToken";
    return this.httpClient.post<CustomResponse<AuthToken & string>>(url, null);
  }

  searchUser = (username: string): Observable<User[]> => {
    const url = this.baseUrl + "/SearchUser";
    var params = new HttpParams().append("username", username);
    return this.httpClient.get<User[]>(url, { params: params })
  }
}
