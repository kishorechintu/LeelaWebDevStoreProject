import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { addPost } from '../State/post.actions';
import { Post } from '../State/post.state';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
postForm: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })
  }

  onAddPost(){
    console.log(" tee",this.postForm)

    const post: Post = {
      title: this.postForm.controls.title.value,
      description: this.postForm.controls.description.value
    }

    this.store.dispatch(addPost({post}));
  }

}
