import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../main.scss']
})
export class HomeComponent implements OnInit {

	constructor(public authService: AuthService, public db: DatabaseService) {
		
	}
	
	ngOnInit(): void {
		this.checkIfUsercontactExists();

	}

	signOut() {
		this.authService.signOut();
	}

	// checks if there is a usercontact, if not it will create one
	checkIfUsercontactExists() {
		this.db.getUserContact().then(doc => {
			if(doc.exists) {
				localStorage.setItem('usercontactid', doc.id);
			} else {
				console.log('doc exists');
				this.db.createUserContact(firebase.auth().currentUser);
			}
		})
	}



}
