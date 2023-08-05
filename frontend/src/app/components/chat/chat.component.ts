import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chat } from 'src/app/models/entities/chat';
import { Message } from 'src/app/models/entities/message';
import { User } from 'src/app/models/entities/user';
import { MessageForm } from 'src/app/models/forms/message-form';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';
import { SignalRService } from 'src/app/services/signalr/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild("scrollContainer", { static: false }) scrollContainer: ElementRef<HTMLAreaElement>;
  @Input() chatId: string;
  messageForm: FormGroup<MessageForm>;
  user: User;
  chat: Chat;

  constructor(
    private chatService: ChatService,
    private dataService: DataService,
    private chatHub: SignalRService
  ) { }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      message: new FormControl()
    })
    this.chatHub.on("ReceiveNewMessage", (message: Message) => {
      this.chat.messages.push(message);
    })
    this.dataService.currentUser.subscribe(user => this.user = user);
    if (this.chatId) this.chatService.chat(this.chatId).subscribe(response => this.chat = response.response);
  }

  messageClass = (userId: string): string => this.user.id == userId ? "sender messages" : "receiver messages"

  message = () => {
    const message = this.messageForm.value.message;
    if (!message) return;
    this.chatService.message(this.chatId, message).subscribe(response => this.chat.messages = response.response)
    this.messageForm.setValue({ message: "" });
  }

  scrollToBottom = () => {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
