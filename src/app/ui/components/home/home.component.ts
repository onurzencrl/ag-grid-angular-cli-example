import { Component } from '@angular/core';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isModalClosed: boolean = false;
  email: string = '';

  closeModal() {
    this.isModalClosed = true;
  }

  openModal() {
    this.isModalClosed = false;
  }
  subscriber: SubscriberModel = new SubscriberModel();

  constructor(private subscriberService: SubscriberService) {}

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

  onSubmit() {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      this.closeModal(); // Close the modal after submitting
    } else {
      console.error('Email is required!');
    }
  }
}
