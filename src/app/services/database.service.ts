import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../models/contact.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/firestore';


@Injectable({
providedIn: 'root'
})
export class DatabaseService {

	userEmail: string;
	userContactId: string;

	constructor(
		public firestore: AngularFirestore, 
		public authService: AuthService,
		public router: Router,
	) {}

	signUp(email: string, password: string) {
		this.authService.signUp(email, password);
		this.setDefaultPhotoToUser();
	}

	setDefaultPhotoToUser() {
		firebase.auth().currentUser.updateProfile({
			photoURL: '../../../assets/default.jpg',
		}).then(() => console.log("user default photo assigned"))
		.catch(err => console.log(err));
	}

	updateProfile(contactinfo: any){
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).update(contactinfo);
	}

	createUserContact(user: firebase.User) {
		return firebase.firestore().collection('contacts').doc(user.email)
		.set({
			name: user.displayName,
			email: user.email,
			photo: user.photoURL
		});
	}

	signIn(email: string, password: string) {
		this.authService.signIn(email, password);
		localStorage.setItem('usercontactid', email);

	}

	getUserContact() {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).get();
	}

	// CONTACTS

	getSavedContacts() {
		return this.firestore.collection('contacts').doc(localStorage.getItem('usercontactid')).collection('uid').snapshotChanges();
	}

	// CREATE the contact found by email 
	addContact(contact: Contact) {
		var contactData = {
			email: contact.email,
			name: contact.name,
			surname: contact.surname,
		}

		firebase.firestore().collection('contacts').doc(contact.email).get().then(doc => {
			if (doc.exists) {
				firebase.firestore().collection('contacts').doc(localStorage.getItem('usercontactid'))
				.collection('uid').doc(contact.email)
				.set(contactData)
				.then(() => this.router.navigate(['/contacts']))
				.catch(err => console.log(err));
			} else {
				console.log('contact doesnt exist');
			}
		}).catch(err => console.log(err));	
	}

	getContactName(contactid: string) {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(contactid).get();
	}

	doesContactExist(email: string){
		firebase.firestore().collection('contacts').doc(email).get().then(doc => { return doc.exists });
	};

	// UPDATE some or all the fields of a contact
	updateContact(newcontactinfo: Contact, id: string) {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(id).update(newcontactinfo);
	}

	// DELETE the contact from database
	deleteContact(id: string) {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(id).delete();
		 // delete chats with that contact.
		
	}

	// CHATS *******************************

	getCurrentUserChats() {
		return firebase.firestore().collection('chats/').where('members', 'array-contains',this.authService.userData.email).where('archived','==', false).get();
	}

	getContactChats(contact: string) {
		return firebase.firestore().collection('chats').where('members', 'array-contains', contact).get();
	}

	// GET 
	getChat(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).get();
	}

	// Creates a new chat with the user and the contact as members
	createOneToOneChat(contacts: string[]) {
		return firebase.firestore().collection('chats').doc(contacts[0]+contacts[1])
		.set({
			archived: false,
			members: contacts,
			type: 'oneToOne'
		});	
	}

	createGroupChat(contacts: string[], groupname: string) {
		return firebase.firestore().collection('chats').doc().set({
			archived: false,
			members: contacts,
			name: groupname,
			type: 'group'
		});
	}

	deleteChat(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).delete();
	}

	// MESSAGES *********************************

	 // GETS all messages from a chat
	getMessages(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).collection('messages').orderBy('timestamp','asc');
	}

	// CREATES a message
	sendMessage(chatid: string, message: string) {
		return firebase.firestore().collection('chats').doc(chatid).collection('messages')
		.add({
			message: message,
			uid: localStorage.getItem('usercontactid'),
			timestamp: Date.now()
		});
	}

	// DELETES all messages from a chat
	deleteMessages(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).collection('messages').doc().delete();
	}
}
