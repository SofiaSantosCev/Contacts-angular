import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: any[];
  chatForm: any;

  constructor(public db: DatabaseService, public formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.chatForm = this.formbuilder.group({
      message: '',
    });
  }

  send() {
    this.db.sendMessage(this.chatForm.value);
  }

}
