import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contactsetting, ContactsettingModel } from './contactsetting-model';

@Injectable({
  providedIn: 'root'
})
export class ContactsettingService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getContactsettings(pageIndex: number, pageSize: number): Observable<Contactsetting[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Contactsetting[]>(this.apiUrl + 'Contactsettings', { params });
  }

  createContactsetting(item: ContactsettingModel): Observable<ContactsettingModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ContactsettingModel>(this.apiUrl + 'Contactsettings', item, { headers });
  }

  deleteContactsetting(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'contactsettings/' + id);
  }

  updateContactsetting(item: ContactsettingModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Contactsettings', item, { headers });
  }

  getContactsettingById(userId: string): Observable<any> {
    const url = `${this.apiUrl+'Contactsettings'}/${userId}`;
    return this.http.get<any>(url);
  }  
}
