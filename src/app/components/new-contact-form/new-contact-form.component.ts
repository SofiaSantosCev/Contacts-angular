import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Contact } from 'src/app/models/contact.model';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-new-contact-form',
	templateUrl: './new-contact-form.component.html',
	styleUrls: ['./new-contact-form.component.scss', '../../main.scss']
})

export class NewContactFormComponent implements OnInit {
	
	newContactForm: any;

	constructor(public db: DatabaseService, private formbuilder: FormBuilder) {}
	
	ngOnInit() {
		this.newContactForm = this.formbuilder.group({
			name: '',
			surname: '',
			email: '',
			mobile: '',
		});	
	}

	createContact() {
		this.db.createContact(this.newContactForm.value as Contact);
	}

}
