import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSpecific, ProductSpecificModel } from './product-specific-tag-model';


@Injectable({
  providedIn: 'root'
})
export class ProductSpecificTagService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getProductSpecifics(pageIndex: number, pageSize: number): Observable<ProductSpecific> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<ProductSpecific>(this.apiUrl+'ProductSpecificTags', { params });
  }

  createProductSpecific(category: ProductSpecificModel): Observable<ProductSpecificModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductSpecificModel>(this.apiUrl+'ProductSpecificTags', category, { headers });
  }

  deleteProductSpecific(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'ProductSpecificTags/' + id);
  }

  updateCategory(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'ProductSpecificTags', category, { headers });
  }
}
