import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/entities/chat';
import { User } from 'src/app/models/entities/user';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chatId: string;
  user: User;
  chat: Chat;
  constructor(
    private chatService: ChatService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(user => this.user = user);
    if (this.chatId) this.chatService.chat(this.chatId).subscribe(response => this.chat = response.response);
  }

  messageClass = (userId: string): string => 
    this.user.id == userId ? "sender messages" : "receiver messages"
}
