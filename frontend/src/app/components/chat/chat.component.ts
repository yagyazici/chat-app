import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  user: User;
  chat: Chat;
  chatId: string;
  constructor(
    private chatService: ChatService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.firstChild?.paramMap.subscribe(params => {
      this.chatId = params.get("chat-id") ?? ""
    });
    this.dataService.currentUser.subscribe(user => this.user = user);
    this.chatService.getChat(this.chatId).subscribe(response => this.chat = response.response);
  }

  messageClass = (userId: string): string => 
    userId == this.user.id ? "sender messages" : "receiver messages"
}
