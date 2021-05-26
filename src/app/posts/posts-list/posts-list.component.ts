import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/Store/app.state';
import { deletePost } from '../State/post.actions';
import { getPosts } from '../State/post.selector';
import { Post } from '../State/post.state';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]> ;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.posts =  this.store.select(getPosts);
  }

  deletePost(id: number) {
    if (confirm("Are u sure u want to delte ")) {
      console.log("*** deleting****", id);
      this.store.dispatch(deletePost({id}));
    }
  }

}
