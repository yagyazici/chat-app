import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Chat } from 'src/app/models/entities/chat';
import { User } from 'src/app/models/entities/user';
import { SearchForm } from 'src/app/models/forms/search-form';
import { DataService } from 'src/app/services/providers/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: User[];
  searchForm: FormGroup<SearchForm>;
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      message: new FormControl()
    })
    this.searchForm.get("message")?.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(username => {
      if (username) this.search(username);
      else this.users = [];
    })
  }

  search = (username: string) => {
    this.userService.search(username).subscribe(users => this.users = users);
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {
      minHeight: "500px",
      minWidth: "450px"
    });
  }

  closeDialog = () => this.dialog.closeAll();
}
