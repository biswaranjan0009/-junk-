import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRegistrationDetails } from '../../_models/user';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: UserRegistrationDetails;
  registrationForm: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registrationForm = this.createRegisterForm();
  }

  createRegisterForm() {
    return this._fb.group({
      profileFor: ['', Validators.required],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      country: ['', Validators.required],
      mobile: ['', Validators.required],
      religion: ['', Validators.required],
      nativeLang: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
