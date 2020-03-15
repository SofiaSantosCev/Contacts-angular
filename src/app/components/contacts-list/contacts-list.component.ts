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
		
		this.db.getSavedContacts().subscribe(data => {
			
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
		this.db.getContactName(contactid)
		.then((doc) => {
			if (doc.exists) {
				return doc.data().name;
			} else {
				return 'no such document';
			}
		}).catch(err => console.log(err));
	}

	selectItem(id: string) {
		localStorage.setItem('contactSelectedId', id);
	}
	
	delete(id: string) {
		this.db.deleteContact(id)
		.then(() => console.log('contact deleted'))
		.catch(err => console.log(err));

		this.db.getContactChats(id)
		.then(doc => {
			if (doc.empty) {
				console.log('no chats to delete');
			} else {
				doc.forEach(e => {
					e.ref.delete();
					e.ref.collection('messages').get().then(doc => doc.empty ? doc.forEach(e=>e.ref.delete()): console.log('doc empty'))
				})
			}
		})
	}

	newChat(id: string) {
		let members = [];
		members.push(id, firebase.auth().currentUser.email);
		
		this.db.createOneToOneChat(members)
		.then(() => console.log('chat created with: ' + id))
		.catch(err => console.log(err));
	}


}
