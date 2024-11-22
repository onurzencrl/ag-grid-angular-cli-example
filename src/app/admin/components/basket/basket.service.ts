import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Basket, BasketModel } from './basket-model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }
  private basketCount = new Subject<number>();
  basketCount$ = this.basketCount.asObservable();

  // Diğer metotlar...

  updateBasketCount(count: number) {
    this.basketCount.next(count);
  }

  getBaskets(pageIndex: number, pageSize: number): Observable<Basket[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Basket[]>(this.apiUrl + 'Baskets', { params });
  }

  createBasket(item: BasketModel): Observable<BasketModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<BasketModel>(this.apiUrl + 'Baskets', item, { headers });
  }

  deleteBasket(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'baskets/' + id);
  }

  updateBasket(item: BasketModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Baskets', item, { headers });
  }
}
