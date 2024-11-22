import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerModel } from './customer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCustomers(pageIndex: number, pageSize: number): Observable<Customer> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Customer>(this.apiUrl+'Categories', { params });
  }

  createCustomer(category: CustomerModel): Observable<CustomerModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CustomerModel>(this.apiUrl+'Categories', category, { headers });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Categories/' + id);
  }

  updateCategory(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Categories', category, { headers });
  }
}
