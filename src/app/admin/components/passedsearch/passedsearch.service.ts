import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passedsearch, PassedsearchModel } from './passedsearch-model';

@Injectable({
  providedIn: 'root'
})
export class PassedsearchService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getPassedsearches(pageIndex: number, pageSize: number): Observable<Passedsearch[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Passedsearch[]>(this.apiUrl + 'Passedsearches', { params });
  }

  createPassedsearch(item: PassedsearchModel): Observable<PassedsearchModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<PassedsearchModel>(this.apiUrl + 'Passedsearches', item, { headers });
  }

  deletePassedsearch(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + 'passedsearches/' + id);
  }

  updatePassedsearch(item: PassedsearchModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Passedsearches', item, { headers });
  }
}
