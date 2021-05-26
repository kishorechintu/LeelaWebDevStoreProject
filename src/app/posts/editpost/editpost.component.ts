import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/Store/app.state';
import { updatePost } from '../State/post.actions';
import { getPostById } from '../State/post.selector';
import { Post } from '../State/post.state';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  updateForm: FormGroup;
  post: Post;
  constructor(private route: ActivatedRoute, private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: number = Number(params.id);
      this.store.select(getPostById, { id }).subscribe((data) => {
        this.post = data;
        console.log('* post is **', this.post);
        this.createFormData();
      });
    });
  }

  createFormData() {
    this.updateForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onUpdatePost() {
    const title = this.updateForm.controls.title.value;
    const description = this.updateForm.controls.description.value;

    const post: Post = {
      id: this.post.id,
      title: title,
      description: description,
    };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts'])
  }
}
