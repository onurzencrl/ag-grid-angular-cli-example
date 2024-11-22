import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter, FilterModel } from './filter-model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getFilters(pageIndex: number, pageSize: number): Observable<Filter[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Filter[]>(this.apiUrl + 'Filters', { params });
  }

  createFilter(item: FilterModel): Observable<FilterModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FilterModel>(this.apiUrl + 'Filters', item, { headers });
  }

  deleteFilter(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'filters/' + id);
  }

  updateFilter(item: FilterModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Filters', item, { headers });
  }
}
