import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Basketitem, BasketitemModel } from './basketitem-model';

@Injectable({
  providedIn: 'root'
})
export class BasketitemService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getBasketitems(pageIndex: number, pageSize: number): Observable<Basketitem[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Basketitem[]>(this.apiUrl + 'Basketitems', { params });
  }

  createBasketitem(item: BasketitemModel): Observable<BasketitemModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<BasketitemModel>(this.apiUrl + 'Basketitems', item, { headers });
  }

  deleteBasketitem(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'basketitems/' + id);
  }

  updateBasketitem(item: BasketitemModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Basketitems', item, { headers });
  }
}
