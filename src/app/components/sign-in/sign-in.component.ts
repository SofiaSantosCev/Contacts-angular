import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signUpForm: any;
  signInForm: any;
  newUser: User;
  active: boolean;
  signInBool: boolean;
  signUpBool: boolean;

  constructor(public db: DatabaseService, public formbuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      name: '',
      email: '',
      password: ''
    });

    this.signInForm = this.formbuilder.group({
      name: '',
      email: '',
      password: ''
    });

    this.signInBool = true;
    this.show();
  }

  signUp() {
    this.db.addUser(this.signUpForm.value);
  }

  tryRegister(value) {
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  signIn() {

  }

  

  show() {
    if (this.active) {
      this.active = false;
      this.signUpBool = true;
      this.signInBool = false;
    } else {
      this.active = true;
      this.signInBool = true;
      this.signUpBool = false;
    }
  }
}
