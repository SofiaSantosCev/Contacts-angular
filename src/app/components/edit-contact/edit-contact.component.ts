import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss', '../../main.scss']
})
export class EditContactComponent implements OnInit {

  editContactForm;
  contactId: string;
  contact: any;

  constructor(private db: DatabaseService, private formbuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.editContactForm = this.formbuilder.group({
      name: '',
      surname: '',
    });

    this.contactId = localStorage.getItem('contactSelectedId');
    console.log('contactId: ' + this.contactId);
  }

  edit() {
    this.db.updateContact(this.editContactForm.value, this.contactId)
    .then(() => this.router.navigate(['/contacts']))
		.catch((error) => console.log(error));
	}

}
