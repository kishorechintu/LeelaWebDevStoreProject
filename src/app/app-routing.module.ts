import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/services/auth-guard.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: ()=> import('./Auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'counter',
    loadChildren: ()=> import('./Counter/counter.module').then(m => m.CountModule),
  },
  {
    path: 'posts',
    loadChildren: ()=> import('./posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
