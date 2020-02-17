import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.scss']
})
export class NewContactFormComponent implements OnInit {
  newContactForm: any;
  constructor(public db: DatabaseService, public formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newContactForm = this.formbuilder.group({
      name: '',
      surname: '',
      email: '',
      mobile: ''
    });
  }

  addContact() {
    this.db.addContact(this.newContactForm.value);
  }

}
