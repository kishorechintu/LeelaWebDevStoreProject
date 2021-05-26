import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLoginStart } from './Auth/State/auth.actions';
import { AppState } from './Store/app.state';
import { getErrorMessage, getLoading } from './Store/Shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  title = 'Store-Project';
  
  constructor(private store: Store<AppState>){}

  ngOnInit() {

    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLoginStart());
  }
}
