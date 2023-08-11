import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/models/auth/authentication';
import { AuthForm } from 'src/app/models/forms/auth-form';
import { DataService } from 'src/app/services/providers/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup<AuthForm>;
  currentUrl: string;
  routerLink: string;
  innerLabel: string;
  label: string;
  hide = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url == "/login" ? "login" : "register";
    this.setRouterLink()
    this.authForm = new FormGroup({
      Username: new FormControl("string"),
      Password: new FormControl("string")
    })
  }

  setRouterLink() {
    this.routerLink = this.router.url == "/login" ? "/register" : "/login"
    this.label = this.router.url == "/login" ? "Don't have an account?" : "Have an account already?"
    this.innerLabel = this.router.url == "/login" ? "Sign up" : "Log in"
  }

  submit = () => {
    const username = this.authForm.value.Username;
    const password = this.authForm.value.Password;
    if (username == null || password == null){
      console.log("invalid");
      return;
    }
    const authenticate: Authentication = {
      Username: username,
      Password: password
    }
    if (this.currentUrl == "login"){
      this.userService.login(authenticate).subscribe(response => {
        if (response.IsSuccessful) {
          localStorage.setItem("token", response.AuthToken.Token);
          localStorage.setItem("token-expires", response.AuthToken.Expires.toString());
          localStorage.setItem("refresh-token", response.RefreshToken.Token);
          localStorage.setItem("current-user", JSON.stringify(response.Data))
          this.dataService.changeCurrentUser(response.Data)
          this.router.navigate(['/chat']);
          return;
        }
      })
    }
    if (this.currentUrl == "register"){
      this.userService.register(authenticate).subscribe(response => {        
        if (response.IsSuccessful){
          this.router.navigate(["/login"]);
          return;
        }
      })
    }
  }
}