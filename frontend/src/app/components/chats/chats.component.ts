import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/entities/chat';
import { Message } from 'src/app/models/entities/message';
import { User } from 'src/app/models/entities/user';
import { SendMessage } from 'src/app/models/responses/send-message';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';
import { SignalRService } from 'src/app/services/signalr/signalr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  @Input() chatId: string;
  user: User;
  chats: Chat[];
  lastMessage: Message;
  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private userService: UserService,
    private chatHub: SignalRService
  ) { }

  async ngOnInit() {
    await this.userService.refreshToken();
    this.dataService.currentUser.subscribe(user => this.user = user)
    this.chatService.chats().subscribe(response => {
      this.chats = response.response
      this.dataService.changeChats(this.chats)
    });
    this.dataService.currentChats.subscribe(chats => this.chats = chats)

    this.chatHub.on("ReceiveNewChat", (chat: Chat) => {
      this.dataService.addChat(chat);
    });
    // this.seen()
    this.chatHub.on("ReceiveNewMessage", (sendMessage: SendMessage) => {
      const chatIndex = this.chats.findIndex(chat => chat.id === sendMessage.chatId);
      if (chatIndex !== -1) {
        const chat = this.chats[chatIndex];
        if (chat.id !== this.chatId) chat.seen = false;
        chat.messages.push(sendMessage.message);
        chat.lastUpdate = new Date();
        this.chats.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime());
      }
    });
  }

  seen = (chatId: string) => {
    const chatIndex = this.chats.findIndex(chat => chat.id == chatId);
    const chat = this.chats[chatIndex];
    if (chat.id !== this.chatId){
      chat.seen = true;
    }
  }

  receiver = (participants: User[]): string =>
    participants.filter(user => user.id !== this.user.id)[0].username;

  chatClasses = (chatId: string) => this.chatId == chatId ? "chat selected" : "chat";

  latestMessage = (messages: Message[]): Message => this.lastMessage = messages[messages.length - 1];
}
