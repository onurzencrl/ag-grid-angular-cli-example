import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getComments(pageIndex: number, pageSize: number): Observable<Comment[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Comment[]>(this.apiUrl + 'Comments', { params });
  }

  createComment(item: CommentModel): Observable<CommentModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CommentModel>(this.apiUrl + 'Comments', item, { headers });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'comments/' + id);
  }

  updateComment(item: CommentModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Comments', item, { headers });
  }
}
