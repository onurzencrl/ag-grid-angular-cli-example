import { Injectable } from '@angular/core';
import { Neighbourhood, NeighbourhoodModel } from './neighbourhood-model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeighbourhoodService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getNeighbourhoods(pageIndex: number, pageSize: number): Observable<Neighbourhood> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Neighbourhood>(this.apiUrl+'Neighbourhoods', { params });
  }

  createNeighbourhood(category: NeighbourhoodModel): Observable<NeighbourhoodModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<NeighbourhoodModel>(this.apiUrl+'Neighbourhoods', category, { headers });
  }

  deleteNeighbourhood(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Neighbourhoods/' + id);
  }

  updateNeighbourhood(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Neighbourhoods', category, { headers });
  }
}
