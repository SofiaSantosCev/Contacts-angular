import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Contact } from '../../models/contact.model';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss', '../../main.scss']
})
export class ContactsListComponent implements OnInit {

	contacts: Contact[];

	constructor(public db: DatabaseService, public authService: AuthService) {}
	
	ngOnInit() {
		this.db.getContacts().subscribe(data => {
			this.contacts = data.map(e => {
				return {
					id: e.payload.doc.id,
					name: e.payload.doc.data(),
					...e.payload.doc.data() as Contact
				};
			})
		});
		
		localStorage.removeItem('contactSelectedId');
	}

	getContactName(contactid: string ) {
		firebase.firestore().collection('contacts').doc(contactid).get().then((doc) => {
			if (doc.exists) {
				return doc.data().name;
			} else {
				return 'no such document';
			}
		}).catch((error) => {
			return 'error getting document: ' + error;
		});
	}

	selectItem(id: string) {
		localStorage.setItem('contactSelectedId', id);
	}
	
	delete(id: string) {
		this.db.deleteContact(id);
	}

	newChat(id: string) {
		this.db.createNewChat(id);
	}


}
