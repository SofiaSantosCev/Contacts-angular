import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss', '../../main.scss']
})
export class EditContactComponent implements OnInit {

  editContactForm;
  contactId: string;
  contact: any;

  constructor(private db: DatabaseService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.editContactForm = this.formbuilder.group({
      name: '',
      surname: '',
      email: '',
      mobile: ''
    });

    this.contactId = localStorage.getItem('contactSelectedId');
    //this.getContact();
    console.log('contactId: ' + this.contactId);
  }

  getContact() {
  }

  setValue() {

  }

  edit() {
		this.db.updateContact(this.editContactForm.value, this.contactId);
	}

}
