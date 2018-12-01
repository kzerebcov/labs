import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  requestJSON(requestBody, endpoint): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(endpoint, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), observe: 'response'
    })
      .map((res) => res.body || {})
      .catch((error: any) => Observable.throw(error.json()));
  }
    // requestPage(requestBody, endpoint): Observable<HttpResponse<BlogPost[]>> {
    // return this.http.post<HttpResponse<BlogPost[]>>(endpoint, requestBody, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   }), observe: 'response'
    // })
    //   .map((res) => res.body || {})
    //   .catch((error: any) => Observable.throw(error.json()));
    // }

  requestPage(requestBody, endpoint): Observable<BlogPage> {
    return this.http.post<BlogPage>(endpoint, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .map((res) => res || {})
      .catch((error: any) => Observable.throw(error.json()));
  }
}

export interface BlogPost {
  SortKey: number,
  Slug: string,
  Header: {
    Author: string,
    Title: string,
    Excerpt: string
  },
  Image: {
    Width: number,
    Height: number,
    Source: string
  }
}

export interface BlogPage {
  pages: number,
  pageSize: number,
  currentPage: number,
  posts: BlogPost[]
}
