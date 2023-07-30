import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/entities/chat';
import { User } from 'src/app/models/entities/user';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  user: User;
  chats: Chat[];
  latestMessage: string;
  constructor(
    private dataService: DataService,
    private chatService: ChatService
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.currentUser.subscribe(user => this.user = user)
    this.chatService.getUserChats().subscribe(response => this.chats = response.response);
  }

  receiver = (participants: User[]): string => {
    return participants.filter(user => user.id !== this.user.id)[0].username;
  }
}
