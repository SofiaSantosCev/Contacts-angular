import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public db: DatabaseService
  ) {}

  ngOnInit() {
    /*const chatId = this.route.snapshot.paramMap.get('id');
    this.chat$ = this.cs.joinUsers(this.cs.get(chatId));*/
  }
/*
  submit(chatId) {
    //this.cs.sendMessage(chatId, this.newMsg);
    //this.newMsg = '';
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }
*/
}
