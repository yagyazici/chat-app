import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './components/chats/chats.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthguardService } from './services/providers/authguard.service';
import { CustomRouteReuseStrategyService } from './services/providers/custom-route-reuse-strategy.service';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: "login", component: AuthPageComponent },
  { path: "register", component: AuthPageComponent },
  {
    path: "chat", component: ChatPageComponent, data: { shouldReuse: false }, canActivate: [AuthguardService], children: [
      { path: "", component: ProfileComponent },
      { path: "", component: ChatComponent },
      { path: ":chat-id", component: ChatsComponent }
    ]
  },
  { path: "**", redirectTo: "chat", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthguardService,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategyService },
  ]
})
export class AppRoutingModule { }
