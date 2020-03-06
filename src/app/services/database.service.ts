import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
providedIn: 'root'
})
export class DatabaseService {

	contactsCollection: AngularFirestoreCollection<Contact>;

	constructor(public firestore: AngularFirestore, public authService: AuthService, public db: AngularFireDatabase) {
		
	}

	// CONTACTS

	// get contacts created by the user logged.
	getContacts() {
		return this.firestore.collection('contacts', ref => ref.where('uid', '==', this.authService.getUser())).snapshotChanges();
	}

	createContact(contact: Contact) {
		var contactData = {
			name: contact.name,
			surname: contact.surname,
			email: contact.email,
			mobile: contact.mobile,
			uid: this.authService.getUser(),
		}

		this.firestore.collection('contacts').add(contactData)
			.then(() => console.log('Contact created'))
			.catch((error) => console.log(error)
		);
	}

	updateContact(contact: Contact, id: string) {
		this.contactsCollection.doc(id).update(contact).then(() => {
			console.log('Contact updated');
		}).catch((error) => { 
			console.log(error)
		});
	}

	deleteContact(id: string) {
		this.contactsCollection.doc(id).delete();
	}

	// CHATS

	getChats() {
		return this.firestore.collection('chats', ref => ref.where('uid', '==', this.authService.getUser())).snapshotChanges();
	}

	getContactInfo(contactid: string) {
		return firebase.firestore().collection('contacts').doc(contactid).get();
	}

	createNewChat(contactid: string) {
		var chatInfo = {
			uid: this.authService.getUser(),
			contactid: contactid,
		}

		if (this.checkIfChatExists(contactid)){
			console.log('a chat with this contact already exist');
		} else {
			firebase.firestore().collection('chats').add(chatInfo)
			.then(() => {
				console.log('new chat created')
			}).catch(err => {
				console.log(err);
			});
		}
	}

	async checkIfChatExists(contactid: string) {
		const doc = await this.getChatByIdContact(contactid);
		if (doc.empty) {
			return true;
		} else {
			return false;
		}
	}

	async getChatByIdContact(contactid: string) {
		return firebase.firestore().collection('chats').where('contactid', '==', contactid).get();
		
	}

	getChatById(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).get();
	}

// MESSAGES
	getMessages(chatid: string) {
		return this.firestore.collection('chats').doc(chatid).collection('messages').snapshotChanges();
	}
}
