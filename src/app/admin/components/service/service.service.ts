import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service, ServiceModel } from './service-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getServices(pageIndex: number, pageSize: number): Observable<Service[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Service[]>(this.apiUrl + 'Services', { params });
  }

  createService(item: ServiceModel): Observable<ServiceModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ServiceModel>(this.apiUrl + 'Services', item, { headers });
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'services/' + id);
  }

  updateService(item: ServiceModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Services', item, { headers });
  }
}
