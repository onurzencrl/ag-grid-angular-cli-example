import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Addresses, AddressesModel } from './addresses-model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getAddressess(pageIndex: number, pageSize: number): Observable<Addresses[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Addresses[]>(this.apiUrl + 'Addresses', { params });
  }

  createAddresses(item: AddressesModel): Observable<AddressesModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AddressesModel>(this.apiUrl + 'Addresses', item, { headers });
  }

  deleteAddresses(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'Addresses/' + id);
  }

  updateAddresses(item: AddressesModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Addresses', item, { headers });
  }

  getAddressesById(userId: string): Observable<any> {
    const url = `${this.apiUrl+'Addresses'}/${userId}`;
    return this.http.get<any>(url);
  }  
  getAddressesByAddressId(id: string): Observable<any> {
    const url = `${this.apiUrl+'Addresses/address'}/${id}`;
    return this.http.get<any>(url);
  }
}
