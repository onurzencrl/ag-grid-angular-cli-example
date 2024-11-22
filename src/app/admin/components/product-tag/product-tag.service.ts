import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  ProductTag, ProductTagModel } from './product-tag-model';

@Injectable({
  providedIn: 'root'
})
export class ProductTagService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getProductTags(pageIndex: number, pageSize: number): Observable<ProductTag> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<ProductTag>(this.apiUrl+'Tags', { params });
  }

  createProductTag(category: ProductTagModel): Observable<ProductTagModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductTagModel>(this.apiUrl+'Tags', category, { headers });
  }

  deleteProductTag(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Tags/' + id);
  }

  updateProductTag(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Tags', category, { headers });
  }
}
