import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productimage, ProductimageModel } from './productimage-model';

@Injectable({
  providedIn: 'root'
})
export class ProductimageService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getProductimages(pageIndex: number, pageSize: number): Observable<Productimage[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Productimage[]>(this.apiUrl + 'Productimages', { params });
  }

  createProductimage(item: ProductimageModel): Observable<ProductimageModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductimageModel>(this.apiUrl + 'Productimages', item, { headers });
  }

  deleteProductimage(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'productimages/' + id);
  }

  updateProductimage(item: ProductimageModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Productimages', item, { headers });
  }
  getProductimageById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Productimages/' + id);
  }
}
