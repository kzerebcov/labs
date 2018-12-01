import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from "@angular/common";
import { PostComponent } from "./post/post.component";
import { BlogComponent } from "./blog/blog.component";
import { Route, RouterModule, Routes, UrlSegment, UrlSegmentGroup } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
  },
  {
    path: 'posts',
    component: BlogComponent,
  },
  {
    path: ':slug',
    component: PostComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule { }
