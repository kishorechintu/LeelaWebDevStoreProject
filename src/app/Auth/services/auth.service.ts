import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth.model';
import { User } from '../models/user.model';
import { logout } from '../State/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponse> {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`;
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  signUp(email: string, password: string): Observable<AuthResponse> {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`;
    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  formatUser(data: AuthResponse) {
    let expirationData = new Date(
      new Date().getTime() + Number(data.expiresIn) * 1000
    );
    const user = new User(
      data.email,
      expirationData,
      data.localId,
      data.idToken
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'INVALID_EMAIL':
        return 'Invalid Email';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.';

      default:
        return 'Unknown error occured';
    }
  }
  
  setUsertoLocalStorage(user: User) {
      sessionStorage.setItem('userData', JSON.stringify(user));
      this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const newDate = new Date().getTime();
    const expirationDate = user.getExpirationDate().getTime();
    const intervalTime = expirationDate - newDate;

    this.timeoutInterval = setTimeout(()=>{
        this.store.dispatch(logout());
    }, intervalTime)
  }

  getUserFromLocalStorage() {
    const userDataString = sessionStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const expirationDate = new Date(userData.expirationDate);
        const user = new User(userData.email, expirationDate, userData.localId, userData.token);
        this.runTimeoutInterval(user);
        return user;
    }
    return null;
  }

  logout() {
      sessionStorage.removeItem('userData');
      if (this.timeoutInterval) {
          clearInterval(this.timeoutInterval);
          this.timeoutInterval = null;
      }
  }
}
