import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/components/login/auth.service';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  authenticatorCode: string = ''; // Add this if needed
confirmPassword: any;
name: any;

  ngOnInit(): void {
    this.authService.checkTokenExpiration(); // Initial check when component loads
    setInterval(() => {
      this.authService.checkTokenExpiration();
    }, 60000); // Check every 60 seconds
  }
  selectedTab: string = 'login'; // Default 'login' tab
  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerPassword: string = '';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


  constructor(private authService: AuthService , private router: Router ,private subscriberService: SubscriberService) { }


  subscriber: SubscriberModel = new SubscriberModel();


  onSubmitAboneOl(): void {
    this.subscriberService.createSubscriber(this.subscriber).subscribe({
      next: (response) => {
        console.log('Subscription successful!', response);
        // Handle success (e.g., close the modal, display a message, etc.)
        
      },
      error: (error) => {
        console.error('Subscription failed', error);
        // Handle error (e.g., display an error message)
      }
    });

  }

  onSubmitUyeOl(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService.register(this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Handle successful registration, e.g., redirect to login
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Handle error, show message to user
        }
      });
  }
  onSubmit(): void {
    this.authService.login(this.loginEmail, this.loginPassword)
      .subscribe(
        (response) => {
          console.log('Login successful!', response);
          
          // Save token and expiration date to localStorage
          localStorage.setItem('token', response.accessToken.token);
          localStorage.setItem('expirationDate', response.accessToken.expirationDate);
          localStorage.setItem('userId', response.userId);
  
          // Check token expiration immediately after login
          this.authService.checkTokenExpiration();
  
          // Navigate to admin page or homepage
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }
  

  
}
