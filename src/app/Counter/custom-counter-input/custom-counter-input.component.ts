import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../State/counter.actions';
import { getChannelName } from '../State/counter.selectors';
import { CounterState } from '../State/counter.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: any;
  // channelName: string;
  constructor(private store: Store<{counter: CounterState}>) { }

  ngOnInit(): void {
    this.store.select(getChannelName).subscribe((data)=>{
      this.value = data;
    })
  }

  onAdd() {
  this.store.dispatch(customIncrement({value: Number(this.value)}))  }

  onChangedText() {
  this.store.dispatch(changeChannelName({value: this.value}));
  }
}
