import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../main.scss']
})
export class SignUpComponent implements OnInit {

	email: string;
	password: string;

	constructor(public authService: AuthService, public db: DatabaseService) { }

	ngOnInit(): void {
	}

	signUp() {
		this.db.signUp(this.email, this.password);
	}


}
