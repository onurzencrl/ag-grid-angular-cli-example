import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review, ReviewModel } from './review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getReviews(pageIndex: number, pageSize: number): Observable<Review> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Review>(this.apiUrl + 'Reviews', { params });
  }

  createReview(item: ReviewModel): Observable<ReviewModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ReviewModel>(this.apiUrl + 'Reviews', item, { headers });
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'reviews/' + id);
  }

  updateReview(item: ReviewModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Reviews', item, { headers });
  }
}
