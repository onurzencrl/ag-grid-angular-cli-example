import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getPosts(pageIndex: number, pageSize: number): Observable<Post[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Post[]>(this.apiUrl + 'Posts', { params });
  }

  getBlogDetail(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Posts/'+id.toString());
  }

  createPost(item: PostModel): Observable<PostModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PostModel>(this.apiUrl + 'Posts', item, { headers });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'posts/' + id);
  }

  updatePost(item: PostModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Posts', item, { headers });
  }
}
