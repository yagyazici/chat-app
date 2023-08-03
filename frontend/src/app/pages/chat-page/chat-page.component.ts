import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  chatId: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.firstChild?.paramMap.subscribe(params => {
      this.chatId = params.get("chat-id") ?? ""
    });
    this.userService.refreshToken();
  }
}
