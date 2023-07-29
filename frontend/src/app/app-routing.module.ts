import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatsComponent } from './components/chats/chats.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthguardService } from './services/providers/authguard.service';

const routes: Routes = [
  { path: "login", component: AuthPageComponent },
  { path: "register", component: AuthPageComponent },
  {
    path: "chat", component: ChatPageComponent, canActivate: [AuthguardService], children: [
      { path: "", component: ChatComponent },
      { path: ":id", component: ChatsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthguardService]
})
export class AppRoutingModule { }
