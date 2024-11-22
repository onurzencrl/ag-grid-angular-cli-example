import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { City, CityModel } from './city-model';
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCitys(pageIndex: number, pageSize: number): Observable<City> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<City>(this.apiUrl+'Cities', { params });
  }

  createCity(category: CityModel): Observable<CityModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CityModel>(this.apiUrl+'Cities', category, { headers });
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Cities/' + id);
  }

  updateCategory(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Cities', category, { headers });
  }
}
