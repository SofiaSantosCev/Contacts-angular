import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../main.scss']
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, public router: Router, public db: DatabaseService) { }

  ngOnInit(): void {}

  signIn() {
      this.db.signIn(this.email, this.password);
  }
} 
