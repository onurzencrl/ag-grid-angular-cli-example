import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartinfo, CartinfoModel } from './cartinfo-model';

@Injectable({
  providedIn: 'root'
})
export class CartinfoService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCartinfoes(pageIndex: number, pageSize: number): Observable<Cartinfo[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Cartinfo[]>(this.apiUrl + 'Cartinfoes', { params });
  }

  createCartinfo(item: CartinfoModel): Observable<CartinfoModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CartinfoModel>(this.apiUrl + 'Cartinfoes', item, { headers });
  }

  deleteCartinfo(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'Cartinfoes/' + id);
  }

  updateCartinfo(item: CartinfoModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Cartinfoes', item, { headers });
  }
  getCartinfoById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Cartinfoes/' + id);
  }
}
