import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favitem, FavitemModel } from './favitem-model';

@Injectable({
  providedIn: 'root'
})
export class FavitemService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getFavitems(pageIndex: number, pageSize: number): Observable<Favitem[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Favitem[]>(this.apiUrl + 'Favitems', { params });
  }

  createFavitem(item: FavitemModel): Observable<FavitemModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FavitemModel>(this.apiUrl + 'Favitems', item, { headers });
  }

  deleteFavitem(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'favitems/' + id);
  }

  updateFavitem(item: FavitemModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Favitems', item, { headers });
  }
}
