import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        (response) => {
          console.log('Login successful!', response);
          
          // Token'ı local storage'a kaydedin
          localStorage.setItem('token', response.accessToken.token);
          localStorage.setItem('userId', response.userId);
          
          // Admin sayfasına yönlendirin
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }
  
}
