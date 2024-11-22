import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Footercontact, FootercontactModel } from './footercontact-model';

@Injectable({
  providedIn: 'root'
})
export class FootercontactService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getFootercontacts(pageIndex: number, pageSize: number): Observable<Footercontact[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Footercontact[]>(this.apiUrl + 'Footercontacts', { params });
  }

  createFootercontact(item: FootercontactModel): Observable<FootercontactModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<FootercontactModel>(this.apiUrl + 'Footercontacts', item, { headers });
  }

  deleteFootercontact(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'footercontacts/' + id);
  }

  updateFootercontact(item: FootercontactModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Footercontacts', item, { headers });
  }
}
