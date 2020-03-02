import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FirebaseApp } from '@angular/fire';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  contactsCollection: AngularFirestoreCollection<Contact>
  constructor(public firestore: AngularFirestore, public firebase: FirebaseApp) {}

  // CONTACT
  getContacts() {
    return this.firestore.collection('contacts').snapshotChanges();
  }

  createContact(contact: Contact) {
    this.firestore.collection('contacts').add(contact)
      .then(() => console.log('Contact created'))
      .catch((error) => console.log(error)
    );
  }

  updateContact(contact: Contact, id) {
    this.firestore.collection('contacts').doc(id).update(contact).then(() => {
      console.log('Contact updated')
    }).catch((error) => { 
      console.log(error)
    });
  }

  deleteContact(id: string) {
    this.firestore.collection('contacts').doc(id).delete();
  }
}
