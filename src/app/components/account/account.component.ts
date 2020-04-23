import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss', '../../main.scss']
})
export class AccountComponent implements OnInit {
  usercontact: any;
  user = firebase.auth().currentUser;
  
  constructor(public authService: AuthService, public db: DatabaseService) {}
  
  ngOnInit(): void {
    this.getUserContact();
  }

  async getUserContact() {
    await this.db.getUserContact().then(doc => {
      this.usercontact = doc.data();
    })
  }

  deleteAccount() {
    this.authService.deleteAccount();
  }

}
