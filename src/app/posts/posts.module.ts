import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AddpostComponent } from './addpost/addpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { postsReducer } from './State/post.reducer';
import { POST_STATE_NAME } from './State/post.selector';

export const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      { path: 'add', component: AddpostComponent },
      { path: 'edit/:id', component: EditpostComponent },
    ],
  },
];

@NgModule({
  declarations: [PostsListComponent, AddpostComponent, EditpostComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
  ],
})
export class PostsModule {}
