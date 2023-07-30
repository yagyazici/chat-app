import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/entities/user';
import { SignalrService } from 'src/app/services/signalr/signalr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  currentUser: User;
  constructor(
    private signalRService: SignalrService,
    private userService: UserService
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = <User>JSON.parse(localStorage.getItem("current-user") || "");
    // this.signalRService.start(this.currentUser.id)
  }
}
