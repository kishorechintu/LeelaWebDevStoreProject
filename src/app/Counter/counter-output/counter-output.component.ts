import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { getCounter } from '../State/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter: number;
  counterSubscription: Subscription = new Subscription();
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
   this.counterSubscription = this.store.select(getCounter).subscribe((data) => {
      this.counter = data;
    });
  }

  ngOnDestroy() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
