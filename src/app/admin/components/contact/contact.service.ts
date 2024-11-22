import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact, ContactModel } from './contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getContacts(pageIndex: number, pageSize: number): Observable<Contact[]> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Contact[]>(this.apiUrl + 'Contacts', { params });
  }

  createContact(item: ContactModel): Observable<ContactModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ContactModel>(this.apiUrl + 'Contacts', item, { headers });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'contacts/' + id);
  }

  updateContact(item: ContactModel): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'Contacts', item, { headers });
  }
  getContactById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'Contacts/' + id);
  }
}
