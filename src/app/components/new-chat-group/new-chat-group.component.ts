import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { DatabaseService } from 'src/app/services/database.service';
import { 
	FormBuilder, 
	FormControl, 
	FormArray, 
	FormGroup
 } from '@angular/forms';
 import * as firebase from 'firebase';

@Component({
  selector: 'app-new-chat-group',
  templateUrl: './new-chat-group.component.html',
  styleUrls: ['./new-chat-group.component.scss', '../../main.scss']
})
export class NewChatGroupComponent implements OnInit {

	contacts: any[];
	contactSelected = []
	groupname: string;

  	constructor(
	  public db: DatabaseService, 
	  public formbuilder: FormBuilder
	) {
		  
		
   }

  	ngOnInit(): void {
		this.db.getSavedContacts().subscribe(data => {
			this.contacts = data.map(e => {
				return {
					id: e.payload.doc.id,
					name: e.payload.doc.data().name,
					email: e.payload.doc.data().email,
					...e.payload.doc.data() as Contact
				};
			})
		});

	}
	
	check(email) {
		this.contactSelected.push(email);
	}


	createGroupChat() {
		this.contactSelected.push(firebase.auth().currentUser.email);
		this.db.createGroupChat(this.contactSelected, this.groupname)
		.then(() => console.log('group created' + this.contactSelected))
		.catch(err => console.log(err));
	}

}
