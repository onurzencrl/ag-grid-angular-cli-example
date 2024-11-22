import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favproduct, FavproductModel } from './favproduct-model';

@Injectable({
  providedIn: 'root'
})
export class FavproductService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getFavproducts(pageIndex: number, pageSize: number): Observable<Favproduct[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Favproduct[]>(this.apiUrl + 'Favproducts', { params });
  }

  createFavproduct(item: FavproductModel): Observable<FavproductModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavproductModel>(this.apiUrl + 'Favproducts', item, { headers });
  }

  deleteFavproduct(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'favproducts/' + id);
  }

  updateFavproduct(item: FavproductModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Favproducts', item, { headers });
  }
}
