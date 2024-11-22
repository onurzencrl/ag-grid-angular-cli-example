import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu, MenuModel } from './menus-model';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getMenus(pageIndex: number, pageSize: number): Observable<Menu> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Menu>(this.apiUrl+'Menus', { params });
  }

  createMenu(Menu: MenuModel): Observable<MenuModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<MenuModel>(this.apiUrl+'Menus', Menu, { headers });
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Menus/' + id);
  }

  updateMenu(Menu: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Menus', Menu, { headers });
  }
}
