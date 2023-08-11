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
      this.chats = response.Data
      this.dataService.changeChats(this.chats)
    });
    this.dataService.currentChats.subscribe(chats => this.chats = chats)
    this.chatHub.on("ReceiveNewChat", (chat: Chat) => {
      this.dataService.addChat(chat);
    });
    this.chatHub.on("ReceiveNewMessage", (sendMessage: SendMessage) => {
      const chatIndex = this.chats.findIndex(chat => chat.Id === sendMessage.ChatId);
      if (chatIndex !== -1) {
        const chat = this.chats[chatIndex];
        chat.Messages.push(sendMessage.Message);
        chat.LastUpdate = new Date();
        this.chats.sort((a, b) => new Date(b.LastUpdate).getTime() - new Date(a.LastUpdate).getTime());
      }
    });
  }

  messageSeen = (chat: Chat, latestMessage: Message) =>
    chat.Id !== this.chatId && !this.lastMessage?.SeenList.includes(this.user.Id)

  receiver = (participants: User[]): string =>
    participants.filter(user => user.Id !== this.user.Id)[0].Username;

  chatClasses = (chatId: string) => this.chatId == chatId ? "chat selected" : "chat";

  latestMessage = (messages: Message[]): Message => this.lastMessage = messages[messages.length - 1];
}
