import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	userData: any;
	
	constructor (
		public afAuth: AngularFireAuth, 
		public router: Router, 
		public ngZone: NgZone,
	) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
			  this.userData = user;
			  localStorage.setItem('user', JSON.stringify(this.userData));
			  JSON.parse(localStorage.getItem('user'));
			} else {
			  localStorage.setItem('user', null);
			  JSON.parse(localStorage.getItem('user'));
			}
		})
	}

	
	getUser() {
		return this.userData;
	}

	getUserEmail() {
		return auth().currentUser.email;
	}

	signInWithGoogle() {
		return this.afAuth.signInWithPopup(
			new firebase.auth.GoogleAuthProvider()
		)
	}

	signInWithFacebook() {
		return this.afAuth.signInWithPopup(
			new firebase.auth.FacebookAuthProvider()
		)
	}

	GoogleAuth() {
		return this.AuthLogin(new auth.GoogleAuthProvider());
	  }

	  // Auth logic to run auth providers
	async AuthLogin(provider: auth.AuthProvider) {
		try {
			await this.afAuth.signInWithPopup(provider);
			this.ngZone.run(() => {
				this.router.navigate(['/home']);
			});
		}
		catch (error) {
			window.alert(error);
		}
	}

	signIn(email: string, password: string) {
		this.afAuth.signInWithEmailAndPassword(email, password)
		.then(value =>{
			this.userData = value.user;
			console.log('Successfully signed in!');
			this.router.navigate(['/home']);
		})
		.catch(err => {
			console.log(err);
		})
	  }

	signUp(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
		  .then(res => {
			console.log('Successfully signed up!', res);
			this.router.navigate(['/home']);
		  })
		  .catch(error => {
			console.log('Something is wrong:', error.message);
		  });    
	  }

	sendPasswordResetEmail(passwordResetEmail: string) {
		return this.afAuth.sendPasswordResetEmail(passwordResetEmail);
	}

	signOut() {
		this.afAuth.signOut();
		localStorage.removeItem('usercontactid');
		this.router.navigate(['/signIn']);
	}

	deleteAccount() {
		return firebase.auth().currentUser.delete().then(res => {
			console.log(res);
		  }).catch(err => {
			console.log('error when trying to delete account: ' + err);
		  });
	}
}
