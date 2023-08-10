import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chat } from 'src/app/models/entities/chat';
import { Message } from 'src/app/models/entities/message';
import { User } from 'src/app/models/entities/user';
import { MessageForm } from 'src/app/models/forms/message-form';
import { SendMessage } from 'src/app/models/responses/send-message';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';
import { SignalRService } from 'src/app/services/signalr/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild("scrollContainer", { static: false }) scrollContainer: ElementRef<HTMLAreaElement>;
  @Input() chatId: string;
  messageForm: FormGroup<MessageForm>;
  user: User;
  chat: Chat;

  constructor(
    private chatService: ChatService,
    private dataService: DataService,
    private chatHub: SignalRService,
  ) { }

  ngOnInit(): void {
    this.messageForm = new FormGroup({
      Message: new FormControl()
    })
    this.chatHub.on("ReceiveNewMessage", (sendMessage: SendMessage) => {
      if (this.chatId === sendMessage.ChatId) {
        this.chat.Messages.push(sendMessage.Message);
      }
    })
    this.dataService.currentUser.subscribe(user => this.user = user);

    if (this.chatId) this.chatService.chat(this.chatId).subscribe(response => {
      if (!this.chat) {
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      }
      this.chat = response.Response
    });
  }

  messageDirection = (userId: string): string => this.user.Id == userId ? "sender messages" : "receiver messages"

  curvyMessage = (index: number): string => {
    let classes = "message";
    if (!this.hasNextIndex(this.chat.Messages, index)) {
      if (this.chat.Messages.length == index + 1) classes += " last"
      return classes;
    }
    const nextMessage = this.chat.Messages[index + 1];
    const currentMessage = this.chat.Messages[index];
    if (currentMessage.UserId != nextMessage.UserId) classes += " last"
    return classes;
  }

  message = () => {
    const message = this.messageForm.value.Message;
    if (!message) return;
    this.chatService.message(this.chatId, message).subscribe(response => {
      this.chat.Messages = response.Response
      this.scrollToBottom();
    })
    this.messageForm.setValue({ Message: "" });
  }

  scrollToBottom = () => {
    if (this.scrollContainer) {
      const container = this.scrollContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  hasNextIndex = <T>(arr: T[], currentIndex: number): boolean => currentIndex >= 0 && currentIndex < arr.length - 1;

  trackyByIndex = (index: any, message: Message) => index;

}
