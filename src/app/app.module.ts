import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { NewContactFormComponent } from './components/new-contact-form/new-contact-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import * as firebase from 'firebase';
import { AccountComponent } from './components/account/account.component';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ContactsListComponent,
    NewContactFormComponent,
    SignInComponent,
    SignUpComponent,
    EditContactComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [AuthService, AngularFireAuthModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
