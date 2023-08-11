import { Component, OnInit, TemplateRef } from '@angular/core';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: User;
  users: User[];
  searchForm: FormGroup<SearchForm>;
  chats: Chat[];

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private chatService: ChatService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      Message: new FormControl()
    })
    this.searchForm.get("message")?.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(username => {
      if (username) this.search(username);
      else this.users = [];
    })
    this.dataService.currentChats.subscribe(chats => this.chats = chats)
    this.dataService.currentUser.subscribe(user => this.user = user)
  }

  search = (username: string) => {
    this.userService.search(username).subscribe(users => this.users = users.filter(user => user.Id != this.user.Id));
  }

  openDialog(templateRef: TemplateRef<any>) {
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
      this.dataService.addChat(response.Data);
      this.router.navigate(["chat", response.Data.Id])
      this.closeDialog();
    })
  }

  closeDialog = () => this.dialog.closeAll();
}
