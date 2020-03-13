import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss', '../../main.scss']
})
export class EditProfileComponent implements OnInit  {
  
  editProfileForm: any;

  constructor(public formbuilder: FormBuilder, public db: DatabaseService) {

  }
  
  ngOnInit(): void {
    this.editProfileForm = this.formbuilder.group({
      photo: '',
      name: '',
      surname: '',
    });
  }

  edit() {
    this.db.updateProfile(this.editProfileForm.value)
    .then(() => console.log('profile updated'))
		.catch(err => console.log(err));
  }

}
