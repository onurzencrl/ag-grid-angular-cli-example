import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign, CampaignModel } from './campaign-model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCampaigns(pageIndex: number, pageSize: number): Observable<Campaign[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Campaign[]>(this.apiUrl + 'Campaigns', { params });
  }

  createCampaign(item: CampaignModel): Observable<CampaignModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CampaignModel>(this.apiUrl + 'Campaigns', item, { headers });
  }

  deleteCampaign(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'campaigns/' + id);
  }

  updateCampaign(item: CampaignModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Campaigns', item, { headers });
  }
}
