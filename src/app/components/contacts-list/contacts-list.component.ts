import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  contacts: Contact[];
  constructor(public db: DatabaseService) {

   }

  ngOnInit(): void {
    this.db.getContacts().subscribe(x => this.contacts = x);
  }


}
