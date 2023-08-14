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

  newChat = (userId: string): Observable<CustomResponse<Chat>> => {
    const url = this.baseUrl + "/NewChat";
    const params = new HttpParams().append("userId", userId);
    return this.httpClient.post<CustomResponse<Chat>>(url, null, { params: params });
  }

  newGroupChat = (userIds: string[], name: string): Observable<CustomResponse<Chat>> => {
    const url = this.baseUrl + "/NewGroupChat";
    const params = new HttpParams().append("name", name);
    return this.httpClient.post<CustomResponse<Chat>>(url, userIds, { params: params });
  }

  message = (chatId: string, text: string): Observable<CustomResponse<Message[]>> => {
    const url = this.baseUrl + "/Message";
    const params = new HttpParams().appendAll({
      "chatId": chatId,
      "text": text
    });
    return this.httpClient.post<CustomResponse<Message[]>>(url, null, { params: params });
  }

  chats = (): Observable<CustomResponse<Chat[]>> => {
    const url = this.baseUrl + "/Chats";
    return this.httpClient.get<CustomResponse<Chat[]>>(url);
  }

  chat = (chatId: string): Observable<CustomResponse<Chat>> => {
    const url = this.baseUrl + "/Chat";
    const params = new HttpParams().append("chatId", chatId)
    return this.httpClient.get<CustomResponse<Chat>>(url, { params: params });
  }
}
