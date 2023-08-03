import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/models/entities/chat';
import { Message } from 'src/app/models/entities/message';
import { User } from 'src/app/models/entities/user';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  @Input() chatId: string;
  user: User;
  chats: Chat[];
  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.dataService.currentUser.subscribe(user => this.user = user)
    this.chatService.chats().subscribe(response => this.chats = response.response);
  }

  receiver = (participants: User[]): string => {
    return participants.filter(user => user.id !== this.user.id)[0].username;
  }

  chatClasses = (chatId: string) => 
    this.chatId == chatId ? "chat selected" : "chat"

  latestMessage = (messages: Message[]):Message => messages[messages.length - 1]
}
