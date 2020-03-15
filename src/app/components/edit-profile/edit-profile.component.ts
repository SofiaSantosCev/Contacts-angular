import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss', '../../main.scss']
})
export class EditProfileComponent implements OnInit  {
  
  editPhotoForm: any;
  editNameForm: any;
  editSurnameForm: any;

  constructor(public formbuilder: FormBuilder, public db: DatabaseService) {

  }
  
  ngOnInit(): void {
    this.editPhotoForm = this.formbuilder.group({
      photo: '',
    });

    this.editNameForm = this.formbuilder.group({
      name: '',
    });

    this.editSurnameForm = this.formbuilder.group({
      surname: '',
    });
  }

  editPhoto() {
    this.db.updateProfile(this.editPhotoForm.value)
    .then(() => console.log('profile updated'))
		.catch(err => console.log(err));
  }

  editName() {
    this.db.updateProfile(this.editNameForm.value)
    .then(() => console.log('profile updated'))
		.catch(err => console.log(err));
  }

  editSurname() {
    this.db.updateProfile(this.editSurnameForm.value)
    .then(() => console.log('profile updated'))
		.catch(err => console.log(err));
  }

}
