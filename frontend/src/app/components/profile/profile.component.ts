import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/entities/user';
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
  state: string = "default";

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataService.currentUser.subscribe(user => this.user = user);
  }

  logout = () => this.userService.logout();

  onClose = () => this.state = "default";

  onOpen = () => this.state = "rotated";

  openDialog(templateRef: TemplateRef<any>) {
    var dialog = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe(_ => {
      console.log("bruh");
    })
  }
}
