import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryModel } from './category-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCategorys(pageIndex: number, pageSize: number): Observable<Category> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Category>(this.apiUrl+'Categories', { params });
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CategoryModel>(this.apiUrl+'Categories', category, { headers });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Categories/' + id);
  }

  updateCategory(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Categories', category, { headers });
  }
}
