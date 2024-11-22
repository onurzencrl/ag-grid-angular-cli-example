import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner, BannerModel } from './banner-model';
@Injectable({
  providedIn: 'root'
})
export class BannersService {

  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getBanners(pageIndex: number, pageSize: number): Observable<Banner> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Banner>(this.apiUrl+'Banners', { params });
  }

  createBanner(Banner: BannerModel): Observable<BannerModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<BannerModel>(this.apiUrl+'Banners', Banner, { headers });
  }

  deleteBanner(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Banners/' + id);
  }

  updateBanner(Banner: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Banners', Banner, { headers });
  }
}
