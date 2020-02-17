import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import 'firebase/firestore';
import { Contact } from '../interfaces/contact';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  users: Observable<any[]>;
  contacts: Observable<any[]>;
  messages: Observable<any[]>;
  contactsCollection: any;
  usersCollection: any;

  constructor(public firestore: AngularFirestore, public firebase: FirebaseApp) {
    this.contactsCollection = firestore.collection('contacts');
    this.usersCollection = firestore.collection('users');

    this.users = this.usersCollection.valueChanges();
    this.contacts = this.contactsCollection.valueChanges();
  }

  // USER
  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    /*this.usersCollection.add(user)
    .then(() => {
      console.log('User added');
    }).catch((error) => console.log(error)
    );*/

    this.firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch((error) => {
      console.log(error);
    });
  }

  // CONTACT
  getContacts() {
    return this.contacts;
  }

  addContact(contact: Contact) {
    this.contactsCollection.add(contact)
      .then(() => console.log('Contact created'))
      .catch((error) => console.log(error)
    );
  }

  updateContact() {

  }

  deleteContact() {
  }

  sendMessage(message: any) {

  }
}
