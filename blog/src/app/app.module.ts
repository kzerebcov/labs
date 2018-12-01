import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { BlogAdminComponent } from './blog/blog-admin.component';
import { PostAdminComponent } from './post/post-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    PostComponent,
    BlogAdminComponent,
    PostAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
