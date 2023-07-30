import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse } from '../models/responses/custom-response';
import { Chat } from '../models/entities/chat';
import { Message } from '../models/entities/message';
import { Properties } from '../constants/properties';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = `${Properties.URL}/Chat`;

  constructor(
    private httpClient: HttpClient
  ) { }

  createNewChat = (userId: string): Observable<CustomResponse<Chat>> => {
    const url = this.baseUrl + "/CreateNewChat";
    const params = new HttpParams().append("userId", userId);
    return this.httpClient.post<CustomResponse<Chat>>(url, null, { params: params });
  }

  sendMessage = (chatId: string, text: string): Observable<CustomResponse<Message[]>> => {
    const url = this.baseUrl + "/SendMessage";
    const params = new HttpParams().appendAll({
      "chatId": chatId,
      "text": text
    });
    return this.httpClient.post<CustomResponse<Message[]>>(url, null, { params: params });
  }

  getUserChats = (): Observable<CustomResponse<Chat[]>> => {
    const url = this.baseUrl + "/GetUserChats";
    return this.httpClient.get<CustomResponse<Chat[]>>(url);
  }
}
