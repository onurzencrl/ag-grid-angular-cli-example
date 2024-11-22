import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from './menu-model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getMenus(pageIndex: number, pageSize: number): Observable<Menu> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Menu>(this.apiUrl+'Menus', { params });
  }
}
