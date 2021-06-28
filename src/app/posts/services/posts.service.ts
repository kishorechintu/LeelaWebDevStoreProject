import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../State/post.state';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        'https://leelawebdev--ngrx-store-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPosts(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://leelawebdev--ngrx-store-default-rtdb.firebaseio.com/posts.json',
      post
    );
  }

  updatePosts(post: Post) {
    const postData = {
      [post.id]: {
        title: post.title,
        description: post.description,
      },
    };
    return this.http.patch(
      'https://leelawebdev--ngrx-store-default-rtdb.firebaseio.com/posts.json',
      postData
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://leelawebdev--ngrx-store-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
