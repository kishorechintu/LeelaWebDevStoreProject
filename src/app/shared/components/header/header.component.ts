import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/Auth/State/auth.actions';
import { isAuthenticateduser } from 'src/app/Auth/State/auth.selector';
import { AppState } from 'src/app/Store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isAuthenticated = this.store.select(isAuthenticateduser);
  }

  logOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }
}
