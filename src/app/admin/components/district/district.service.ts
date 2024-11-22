import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { District, DistrictModel } from './district-model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getDistricts(pageIndex: number, pageSize: number): Observable<District> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<District>(this.apiUrl+'Districts', { params });
  }

  createDistrict(category: DistrictModel): Observable<DistrictModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<DistrictModel>(this.apiUrl+'Districts', category, { headers });
  }

  deleteDistrict(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Districts/' + id);
  }

  updateDistricts(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Districts', category, { headers });
  }
}
