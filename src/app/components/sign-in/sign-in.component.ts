import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../../main.scss']
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {}

  signIn() {
      this.authService.signIn(this.email, this.password);
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => { 
        this.router.navigate(['/home'])
      })
    .catch((err) => console.log(err));
  }
} 
