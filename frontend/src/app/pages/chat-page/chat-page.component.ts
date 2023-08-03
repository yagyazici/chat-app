import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  currentUser: User;
  constructor(
    private userService: UserService) { }

  ngOnInit() {
    this.userService.refreshToken();
    this.currentUser = <User>JSON.parse(localStorage.getItem("current-user") || "");
  }
}
