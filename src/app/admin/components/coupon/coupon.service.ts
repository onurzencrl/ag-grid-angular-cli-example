import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon, CouponModel } from './coupon-model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getCoupons(pageIndex: number, pageSize: number): Observable<Coupon[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Coupon[]>(this.apiUrl + 'Coupons', { params });
  }

  createCoupon(item: CouponModel): Observable<CouponModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<CouponModel>(this.apiUrl + 'Coupons', item, { headers });
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'coupons/' + id);
  }

  updateCoupon(item: CouponModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Coupons', item, { headers });
  }
  getCouponById(id: string): Observable<CouponModel> {
    return this.http.get<any>(this.apiUrl + 'Coupons/' + id);
  } 
    getCouponByCouponId(id: string): Observable<CouponModel> {
    return this.http.get<any>(this.apiUrl + 'Coupons/getByCouponId/' + id);
  } 
}
