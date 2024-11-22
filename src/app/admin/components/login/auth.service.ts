import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:60805/api/Auth/Login'; // API URL buraya göre ayarlanmalı
  private updateUrl = 'http://localhost:60805/api/Users'; // API URL buraya göre ayarlanmalı
  private registerUrl = 'http://localhost:60805/api/Auth/Register';
  private resetPasswordUrl = 'http://localhost:60805/api';
  private baseUrl = 'http://localhost:60805/api/Users';

  constructor(private http: HttpClient , private router: Router) { }

 public login(username: string, password: string): Observable<any> {
    const body = {
      email: username,
      password: password,
      authenticatorCode: ''
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  resetPassword(currentPassword: string, newPassword: string): Observable<any> {
    const body = {
      id: localStorage.getItem('userId'),
      password: currentPassword,
      newPassword: newPassword
    };

    return this.http.put(`${this.resetPasswordUrl}/Users/FromAuth`, body);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`)

  }
  

    // Update Profile
    updateProfile(profileData: any): Observable<any> {

  
      return this.http.put(`${this.updateUrl}`, profileData)
    
    }

    checkTokenExpiration(): void {
      const token = localStorage.getItem('token');
      const expirationDate = new Date(localStorage.getItem('expirationDate') || '');
      const currentTime = new Date();
    
      // Check if expiration date is in the past
      if (token && currentTime >= expirationDate) {
        // Token has expired, clear localStorage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
        console.log('Token expired. Please log in again.');
      } else {
        console.log('Token is still valid');
      }
    }
    
  


  logout() {
    // Oturum bilgilerini temizle
    localStorage.removeItem('accessToken'); // accessToken'i kaldırın
    localStorage.removeItem('token'); // accessToken'i kaldırın
    localStorage.removeItem('user'); // varsa user bilgisini kaldırın
    localStorage.removeItem('userId'); // varsa user bilgisini kaldırın
    localStorage.removeItem('expirationDate'); // varsa user bilgisini kaldırın

    // Kullanıcıyı login sayfasına yönlendir
    this.router.navigate(['/adminlogin']);
  }
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(this.registerUrl, body);
  }

  // Kullanıcının oturum açık olup olmadığını kontrol eden metod
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
