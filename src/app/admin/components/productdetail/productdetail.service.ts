import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productdetail, ProductdetailModel } from './productdetail-model';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getProductdetails(pageIndex: number, pageSize: number): Observable<Productdetail[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Productdetail[]>(this.apiUrl + 'Productdetails', { params });
  }

  createProductdetail(item: ProductdetailModel): Observable<ProductdetailModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductdetailModel>(this.apiUrl + 'Productdetails', item, { headers });
  }

  deleteProductdetail(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'productdetails/' + id);
  }

  updateProductdetail(item: ProductdetailModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Productdetails', item, { headers });
  }
  getProductdetailById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Productdetails/' + id);
  }
}
