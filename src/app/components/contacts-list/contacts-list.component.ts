import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Contact } from '../../models/contact.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss', '../../main.scss']
})
export class ContactsListComponent implements OnInit {

	contacts: Contact[];
	contact: any;

	constructor(public db: DatabaseService, public authService: AuthService) {}
	
	ngOnInit() {
		this.db.getContacts(this.authService.userData.uid).subscribe(data => {
			this.contacts = data.map(e => {
				return {
					id: e.payload.doc.id,
					...e.payload.doc.data() as Contact
				};
			})
		});
	}

	edit(contact) {
		this.contact = contact;
	}
	
	delete(id: string) {
		this.db.deleteContact(id);
	}


}
