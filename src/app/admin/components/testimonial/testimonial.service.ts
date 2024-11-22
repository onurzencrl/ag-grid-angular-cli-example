import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Testimonial, TestimonialModel } from './testimonial-model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getTestimonials(pageIndex: number, pageSize: number): Observable<Testimonial[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Testimonial[]>(this.apiUrl + 'Testimonials', { params });
  }

  createTestimonial(item: TestimonialModel): Observable<TestimonialModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<TestimonialModel>(this.apiUrl + 'Testimonials', item, { headers });
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'testimonials/' + id);
  }

  updateTestimonial(item: TestimonialModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Testimonials', item, { headers });
  }
}
