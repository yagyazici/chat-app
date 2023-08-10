import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Chat } from 'src/app/models/entities/chat';
import { User } from 'src/app/models/entities/user';
import { SearchForm } from 'src/app/models/forms/search-form';
import { ChatService } from 'src/app/services/chat.service';
import { DataService } from 'src/app/services/providers/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('200ms ease-out')),
      transition('default => rotated', animate('200ms ease-in'))
    ])
  ],
})
export class ProfileComponent implements OnInit {

  user: User;
  users: User[];
  allUsers: User[];
  searchForm: FormGroup<SearchForm>;
  chats: Chat[];
  state: string = "default";

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private chatService: ChatService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(user => this.user = user);
    this.searchForm = new FormGroup({
      Message: new FormControl()
    })
    this.searchForm.get("Message")?.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(username => {
      if (username) this.search(username);
      else this.users = [];
    })
    this.dataService.currentChats.subscribe(chats => this.chats = chats)
  }

  logout = () => this.userService.logout();

  onClose = () => this.state = "default";

  onOpen = () => this.state = "rotated";

  search = (username: string) => {
    this.userService.search(username).subscribe(users => this.users = users.filter(user => user.Id != this.user.Id));
  }

  openDialog(templateRef: TemplateRef<any>, type: string) {
    if (type === "group"){
      this.userService.getUsers().subscribe(users => this.allUsers = users);
    }
    this.dialog.open(templateRef, {
      minHeight: "500px",
      minWidth: "450px"
    });
  }

  newChat = (userId: string) => {
    console.log(userId);
    const chat = this.chats.filter(chat => {
      return chat.Participants.some(user => user.Id === userId);
    })[0];
    if (chat) {
      this.router.navigate(["chat", chat.Id])
      this.closeDialog();
      return;
    }
    this.chatService.newChat(userId).subscribe(response => {
      this.dataService.addChat(response.Response);
      this.router.navigate(["chat", response.Response.Id])
      this.closeDialog();
    })
  }

  closeDialog = () => this.dialog.closeAll();
}
