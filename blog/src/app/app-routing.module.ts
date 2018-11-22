import { NgModule } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { BlogComponent } from "./blog/blog.component";
import { RouterModule, Routes } from "@angular/router";

// import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: ':slug',
    component: PostComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
