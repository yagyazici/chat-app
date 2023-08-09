import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from 'src/app/models/entities/chat';
import { User } from 'src/app/models/entities/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  user = <User>JSON.parse(localStorage.getItem("current-user") || "{}");
  private userSource = new BehaviorSubject<User>(this.user);
  currentUser = this.userSource.asObservable();
  changeCurrentUser = (user: User) => this.userSource.next(user);

  private chatsSource = new BehaviorSubject<Chat[]>([]);
  currentChats = this.chatsSource.asObservable();
  changeChats = (chats: Chat[]) => this.chatsSource.next(chats);

  addChat(chat: Chat) {
    const currentChats = this.chatsSource.getValue();
    const updatedChats = [chat, ...currentChats];
    this.chatsSource.next(updatedChats);
  }
}
