import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orderdetail, OrderdetailModel } from './orderdetail-model';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getOrderdetails(pageIndex: number, pageSize: number): Observable<Orderdetail[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Orderdetail[]>(this.apiUrl + 'Orderdetails', { params });
  }

  createOrderdetail(item: OrderdetailModel): Observable<OrderdetailModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OrderdetailModel>(this.apiUrl + 'Orderdetails', item, { headers });
  }

  deleteOrderdetail(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'orderdetails/' + id);
  }

  updateOrderdetail(item: OrderdetailModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Orderdetails', item, { headers });
  }
  getOrderdetailById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Orderdetails/' + id);
  }
}
