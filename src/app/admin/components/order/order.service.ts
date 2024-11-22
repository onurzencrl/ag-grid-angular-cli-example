import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderModel } from './order-model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number): Observable<Order> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Order>(this.apiUrl+'Orders', { params });
  }

  createOrder(order: OrderModel): Observable<OrderModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<OrderModel>(this.apiUrl+'Orders', order, { headers });
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Orders/' + id);
  }

  updateorder(order: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Orders', order, { headers });
  }
}
