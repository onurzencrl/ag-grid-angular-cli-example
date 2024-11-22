import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialLink, SocialLinkModel } from '../social-link-model';

@Injectable({
  providedIn: 'root'
})
export class SocialLinksService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getSocialLinks(pageIndex: number, pageSize: number): Observable<SocialLink> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<SocialLink>(this.apiUrl+'Tags', { params });
  }

  createSocialLink(category: SocialLinkModel): Observable<SocialLinkModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SocialLinkModel>(this.apiUrl+'Tags', category, { headers });
  }

  deleteSocialLink(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Tags/' + id);
  }

  updateSocialLink(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Tags', category, { headers });
  }
}
