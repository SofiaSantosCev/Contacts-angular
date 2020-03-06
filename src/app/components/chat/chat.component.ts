import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Chat } from 'src/app/models/chat.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as firebase from 'firebase';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
	chats: Chat[];
	messageInput: string;
	messages: any;
	selectedChatID: string;
	selectedContactName: string;

	constructor (
		public authService: AuthService,
		public db: DatabaseService,
		public datepipe: DatePipe
	) {
		
	}
	
	ngOnInit() {
		this.getChats();
	}

	// WORKS
	getChats() {
		this.db.getChats().subscribe(data => {
			this.chats = data.map(e => {
				return {
					id: e.payload.doc.id,
					... e.payload.doc.data() as Chat
				}
			})
		})
	}

	async getContactName(contactid: string ) {
		firebase.firestore().collection('contacts').doc(contactid).get().then(doc => {
			if (doc.exists) {
				this.selectedContactName = doc.data().name;
			}
		});
	}
	
	async getContactInfo(contactid: string) {
		firebase.firestore().collection('contacts').doc(contactid).get().then(doc => {
			if (doc.exists) {
				return doc.data().name;
			} else {
				console.log('no such document');
			}
		}).catch (error => {
			console.log('error getting document: ' + error);
		})
	}

	// WORKS
	sendMessage() {
		firebase.firestore().collection('chats').doc(this.selectedChatID).collection('messages').add({
			message: this.messageInput,
			senderid: this.authService.getUser(),
			timestamp: Date.now()
		});

		this.messageInput = '';
	}

	// WORKS
	getMessages(chatid: string) {
		this.db.getMessages(chatid).subscribe(data => {
			this.messages = data.map(e => {
				return {
					id: e.payload.doc.id,
					date: this.convertDate(e.payload.doc.data().timestamp),
					senderid: e.payload.doc.data().senderid,
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
		
		firebase.firestore().collection('chats').doc(chatID).get().then((doc) => {
			if(doc.exists) {
				this.getContactName(doc.data().contactid);
			} else {
				console.log('chat doesnt exist');''
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
