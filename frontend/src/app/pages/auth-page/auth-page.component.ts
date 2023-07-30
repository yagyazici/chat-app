import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from 'src/app/models/auth/authentication';
import { AuthForm } from 'src/app/models/forms/auth-form';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url == "/login" ? "login" : "register";
    this.setRouterLink()
    this.authForm = new FormGroup({
      username: new FormControl("string"),
      password: new FormControl("string")
    })
  }

  setRouterLink() {
    this.routerLink = this.router.url == "/login" ? "/register" : "/login"
    this.label = this.router.url == "/login" ? "Don't have an account?" : "Have an account already?"
    this.innerLabel = this.router.url == "/login" ? "Sign up" : "Log in"
  }

  submit = () => {
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;
    if (username == null || password == null){
      console.log("invalid");
      return;
    }
    const authenticate: Authentication = {
      username: username,
      password: password
    }
    if (this.currentUrl == "login"){
      this.userService.login(authenticate).subscribe(response => {
        if (response.isSuccessful) {
          console.log(response);
          localStorage.setItem("token", response.authToken.token);
          localStorage.setItem("token-expires", response.authToken.expires.toString());
          localStorage.setItem("refresh-token", response.refreshToken.token);
          localStorage.setItem("current-user", JSON.stringify(response.response))
          this.router.navigate(['/chat']);
          return;
        }
      })
    }
    if (this.currentUrl == "register"){
      this.userService.register(authenticate).subscribe(response => {        
        if (response.isSuccessful){
          this.router.navigate(["/login"]);
          return;
        }
      })
    }
  }
}