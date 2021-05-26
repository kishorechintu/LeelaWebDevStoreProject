import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { setLoadingSpinner } from 'src/app/Store/Shared/shared.action';
import { signUpStart } from '../State/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSignup() {
    console.log('***', this.signupForm);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signUpStart({email: email, password: password}));
  }
}
