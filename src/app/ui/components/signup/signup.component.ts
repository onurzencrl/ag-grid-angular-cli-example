import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/components/login/auth.service';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService , private subscriberService: SubscriberService) { }

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
  
  onSubmit(): void {
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
  ngOnInit(): void {
  }

}
