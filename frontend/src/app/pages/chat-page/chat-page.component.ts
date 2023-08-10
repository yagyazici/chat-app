import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/providers/data.service';
import { SignalRService } from 'src/app/services/signalr/signalr.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  userId: string
  chatId: string;
  constructor(
    private chatHub: SignalRService,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => this.userId = user.Id);
    if (this.userId) this.chatHub.start(this.userId)
    this.route.firstChild?.paramMap.subscribe(params => this.chatId = params.get("chat-id") ?? "");
  }
}