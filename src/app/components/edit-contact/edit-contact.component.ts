import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss', '../../main.scss']
})
export class EditContactComponent implements OnInit {

  editNameForm;
  editSurnameForm;
  contactId: string;
  contact: any;
  currentUserEmail = firebase.auth().currentUser.email;

  constructor(private db: DatabaseService, private formbuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.editNameForm = this.formbuilder.group({
      name: '',
    });
    this.editSurnameForm = this.formbuilder.group({
      surname: '',
    });
    
    this.contactId = localStorage.getItem('contactSelectedId');
    console.log('contactId: ' + this.contactId);
  }

  editName() {
    this.db.updateContact(this.editNameForm.value, this.contactId)
    .then(() => console.log('Name updated'))
		.catch((error) => console.log(error));
  }

  editSurname() {
    this.db.updateContact(this.editSurnameForm.value, this.contactId)
    .then(() => console.log('Surname updated'))
		.catch((error) => console.log(error));
  }
  
  getContactInfo() {
    firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(this.contactId).update({

    })
  }
  


}
