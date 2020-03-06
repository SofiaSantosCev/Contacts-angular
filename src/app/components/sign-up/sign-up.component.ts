import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../main.scss']
})
export class SignUpComponent implements OnInit {

	email: string;
	password: string;

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}

	signUp() {
		this.authService.signUp(this.email, this.password);
	}


}
