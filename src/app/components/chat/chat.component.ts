import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
	user = "admin@mail.com"

	constructor (
		public authService: AuthService,
		public db: DatabaseService,
		public datepipe: DatePipe
	) {}
	
	ngOnInit() {
		this.getUsersChats();
	}
	
	async getUsersChats() {
		this.db.getCurrentUserChats().then(doc => {
			if(doc.empty) {
				console.log('doc empty')
			} else {
				doc.forEach(e => {
					this.chats.push({
						id: e.id,
						chatName: e.data().members[0], 
						...e.data()
					});
				})
			}
			
		}).catch(err => console.log(err));
	}

	getContactNameByEmail(email: string) {
		this.db.getContactName(email)
		.then(doc => {
			return doc.data().name
		})
		.catch(err => console.log(err));
		
	}
	
	getContactName(email: string) {
		this.db.getContactName(email).then(doc => {
			this.selectedContactName = doc.data().name;
		})
	}

	// transforms the date.now string into the chosen format
	convertDate(date: string) {
		return this.datepipe.transform(date, 'h:mm');
	}

	selectChat(chatID: string) {
		this.selectedChatID = chatID;
		this.getMessages(chatID);
		
		// set chat name to the contact's name the user is talking to
		this.db.getChat(chatID).then((doc) => {
			if(doc.exists) {
				let members = doc.data().members;
				for (let i = 0; i < members.length; i++) {
					if (members[i] != firebase.auth().currentUser.email) {
						this.getContactName(members[i]);
						
					}
				}
			} else {
				console.log('chat doesnt exist');
			}
		})
	}

	deleteChat() {
		this.db.deleteChat(this.selectedChatID);
	}

	getMessages(chatid: string) {
		this.db.getMessages(chatid).onSnapshot((onSnapshot) => {
			this.messages = onSnapshot.docs.map(e => {
				return {
					id: e.id,
					timestamp: this.convertDate(e.data().timestamp),
					uid: e.data().uid,
					message: e.data().message
				}
			})
		});
	}

	sendMessage() {
		if(this.messageInput != ''){
			this.db.sendMessage(this.selectedChatID, this.messageInput)
			.then(() => console.log('message sent'))
			.catch(err => console.log(err));
		}
		this.messageInput = '';
	}

	deleteMessages() {
		this.db.deleteMessages(this.selectedChatID);
	}
}
