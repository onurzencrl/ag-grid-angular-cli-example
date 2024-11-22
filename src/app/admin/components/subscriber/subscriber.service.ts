import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber, SubscriberModel } from './subscriber-model';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getSubscribers(pageIndex: number, pageSize: number): Observable<Subscriber[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Subscriber[]>(this.apiUrl + 'Subscribers', { params });
  }

  createSubscriber(item: SubscriberModel): Observable<SubscriberModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SubscriberModel>(this.apiUrl + 'Subscribers', item, { headers });
  }

  deleteSubscriber(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'subscribers/' + id);
  }

  updateSubscriber(item: SubscriberModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Subscribers', item, { headers });
  }
}
