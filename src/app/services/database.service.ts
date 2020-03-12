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
		firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).update(contactinfo)
		.then(()=> console.log('profile updated'))
		.catch(err => console.log(err));
	}

	createUserContact(user: firebase.User) {
		firebase.firestore().collection('contacts').doc(user.email).set({
			name: user.displayName,
			email: user.email,
			photo: user.photoURL
		}).then(() => {
			console.log('contact created');
		}).catch(err => console.log(err));
	}


	signIn(email: string, password: string) {
		this.authService.signIn(email, password);
		// get user contact id
		this.getUserContactId(email);

	}

	getUserContact() {
		return firebase.firestore().collection('contacts').doc(this.authService.userData.email).get();
	}

	// Add the id of the user's contact this should happen in the login process.
	getUserContactId(email: string) {
		firebase.firestore().collection('contacts').doc(email).get().then(function(doc) {
			if (doc.exists) {
				localStorage.setItem('usercontactid', doc.id);
				console.log('contact id saved: ' + doc.id);
			} else {
				console.log('No contact created for this user');
			}
		})
	}

	// CONTACTS

	getSavedContacts() {
		return this.firestore.collection('contacts').doc(localStorage.getItem('usercontactid')).collection('uid').snapshotChanges();
	}

	// Adds the contact found by email 
	addContact(contact: Contact) {
		var contactData = {
			name: contact.name,
			surname: contact.surname,
			email: contact.email,
			mobile: contact.mobile,
		}

		firebase.firestore().collection('contacts').doc(contact.email).get().then(doc => {
			if(doc.exists) {
				firebase.firestore().collection('contacts').doc(localStorage.getItem('usercontactid'))
				.collection('uid').doc(contact.email).set(contactData)
				.then(() => this.router.navigate(['/contacts']))
				.catch(error => console.log(error));
			} else {
				console.log('contact doesnt exist');
			}
		}).catch(err => {
			console.log(err);
		});		
	}

	getContactName(contactid: string) {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(contactid).get();
	}

	doesContactExistByEmail(email: string){
		firebase.firestore().collection('contacts').doc(email).get().then(doc => { return doc.exists });
	};

	// Updates some or all the fields of a contact
	updateContact(newcontactinfo: Contact, id: string) {
		firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.email).collection('uid').doc(id).set({
			name: newcontactinfo.name,
			surname: newcontactinfo.surname,
		}).then(() => console.log('Contact updated'))
		.catch((error) => console.log(error));
	}

	// Removes the contact from database
	deleteContact(id: string) {
		return firebase.firestore().collection('contacts').doc(firebase.auth().currentUser.uid).collection('uid').doc(id).delete();
		
	}

	// CHATS *******************************

	getUsersChats() {
		return firebase.firestore().collection('chats/').where('members', 'array-contains',this.authService.userData.email).where('archived','==', false).get();
	}

	getChatById(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).get();
	}

	// Creates a new chat with the user and the contact as members
	createOneToOneChat(contacts: string[]) {
		contacts.forEach(item => {
			var memberInfo = {
				email: item
			}

			firebase.firestore().collection('chats').doc(contacts[0]+contacts[1]).collection('members').doc(item).set(memberInfo);
		})
		
	}

	// MESSAGES *********************************
	 // Gets all messages from a chat
	getMessages(chatid: string) {
		return firebase.firestore().collection('chats').doc(chatid).collection('messages').orderBy('timestamp','asc');
	}

	// Sends a message
	sendMessage(chatid: string, message: string) {
		return firebase.firestore().collection('chats').doc(chatid).collection('messages')
		.add({
			message: message,
			uid: localStorage.getItem('usercontactid'),
			timestamp: Date.now()
		});
	}
}
