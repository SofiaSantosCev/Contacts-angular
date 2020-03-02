import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss', '../../main.scss']
})
export class EditContactComponent implements OnInit {

  editContactForm: any;
  contact: any;
  listComponent: ContactsListComponent;

  constructor(private db: DatabaseService, private formbuilder: FormBuilder) { 
    this.contact = this.listComponent.contact;
  }

  ngOnInit(): void {
    this.editContactForm = this.formbuilder.group({
      name: '',
      surname: '',
      email: '',
      mobile: ''
    });

    console.log("contact: " + this.listComponent.contact);
  }

  edit() {
		return this.db.updateContact(this.editContactForm.value, this.listComponent.contact.id);
	}

}
