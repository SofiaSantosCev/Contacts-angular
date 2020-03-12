import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	chats = [];
	messages: any;
	messageInput: string;
	selectedChatID: string;
	selectedContactName: string;

	constructor (
		public authService: AuthService,
		public db: DatabaseService,
		public datepipe: DatePipe
	) {}
	
	ngOnInit() {
		this.getUsersChats();
	}
	
	async getUsersChats() {
		this.db.getUsersChats().then(doc => {
			if(doc.empty) {
				console.log('doc empty')
			} else {
				doc.forEach(e => {
					this.chats.push({
						id: e.id,
						...e.data()
					});
					console.log(this.chats);
				})
			}
			
		}).catch(err => console.log(err));
	}

	getContactName(contactid: string ) {
		this.db.getContactName(contactid)
		.then(doc => (doc.exists) ? 
					this.selectedContactName = doc.data().name : 
					console.log('doc.doesnt exist'))
		.catch(err => console.log(err));
	}	
	
	getContactInfo(contactid: string) {
		firebase.firestore().collection('contacts').doc(contactid).get().then(doc => {
			if (doc.exists) {
				doc.data().name;
			} else {
				console.log('no such document');
			}
		}).catch (error => {
			console.log('error getting document: ' + error);
		})
	}

	// WORKS
	sendMessage() {
		this.db.sendMessage(this.selectedChatID, this.messageInput)
		.then(() => console.log('message sent'))
		.catch(err => console.log(err));

		this.messageInput = '';
	}

	// WORKS
	getMessages(chatid: string) {
		this.db.getMessages(chatid).subscribe(data => {
			this.messages = data.map(e => {
				console.log(e.payload.doc.data());
				return {
					id: e.payload.doc.id,
					timestamp: this.convertDate(e.payload.doc.data().timestamp),
					uid: e.payload.doc.data().uid,
					message: e.payload.doc.data().message
				}
			})
		})
	}

	// transforms the date.now string into the chosen format
	convertDate(date: string) {
		return this.datepipe.transform(date, 'h:mm');
	}

	// WORKS
	selectChat(chatID: string) {
		this.selectedChatID = chatID;
		this.getMessages(chatID);
		
		this.db.getChatById(chatID).then((doc) => {
			if(doc.exists) {
			} else {
				console.log('chat doesnt exist');
			}
		})
	}

	deleteChat() {
		firebase.firestore().collection('chats').doc(this.selectedChatID).delete();
	}

	deleteMessages() {
		firebase.firestore().collection('chats').doc(this.selectedChatID).collection('messages').doc().delete();
	}
}
