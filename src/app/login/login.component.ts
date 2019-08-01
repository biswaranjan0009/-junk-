import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: boolean = false;
  returnUrl: string;

  constructor(
    private _fb: FormBuilder,
    private authenticatationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authenticatationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formValues() {
    return this.loginForm.controls;
  }

  get username() {
    return this.formValues.username.value;
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    this.authenticatationService.login(this.formValues.username.value, this.formValues.password.value).
      pipe(first()).
      subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.error = true;
        this.loading = false;
      });
  }

  createLoginForm() {
    return this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
