import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operator/filter';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ApiService, BlogPost, BlogPage} from "../api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ApiService]
})
export class BlogComponent implements OnInit {
  private fakeArray = [];
  private pages: number;
  private currentPage: number;
  private posts: BlogPost[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['page']) this.currentPage = Number(params['page']);
      else this.currentPage = Number(1);
      this.loadPage();
    });
  }

  loadPage(): void {
    var api = 'https://6o5oj7u1p5.execute-api.eu-central-1.amazonaws.com/prod/blog/';
    this.apiService.requestPage({}, api + String(this.currentPage))
      .subscribe(
        (response: BlogPage) => {
          /* this function is executed every time there's a new output */
          console.log("VALUE RECEIVED: "+ JSON.stringify(response));
          this.fakeArray = new Array(response.pages);
          this.pages = response.pages;
          this.posts = response.posts;
        },
        (err) => {
          /* this function is executed when there's an ERROR */
          console.log("ERROR: "+JSON.stringify(err));
        },
        () => {
          /* this function is executed when the observable ends (completes) its stream */
          console.log("COMPLETED");
        });
  }
}
