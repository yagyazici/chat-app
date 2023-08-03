import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/entities/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  user = <User>JSON.parse(localStorage.getItem("current-user") || "{}");
  private userSource = new BehaviorSubject<User>(this.user);
  currentUser = this.userSource.asObservable();
}
