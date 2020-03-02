import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { NewContactFormComponent } from './components/new-contact-form/new-contact-form.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contacts', component: ContactsListComponent },
  { path: 'new-contact', component: NewContactFormComponent },
  { path: 'edit-contact', component: EditContactComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
