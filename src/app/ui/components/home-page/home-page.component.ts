import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';
import { ChatAssistantService } from '../chat-assistant/chat-assistant.service';

@Component({
  selector: 'ox-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private toastr: ToastrService , private subscriberService: SubscriberService , private chatAssistantService: ChatAssistantService) {

  }

  subscriber: SubscriberModel = new SubscriberModel();

  openChat() {
    this.chatAssistantService.toggleChat();
  }
  onSubmitAboneOl(): void {
    this.subscriberService.createSubscriber(this.subscriber).subscribe({
      next: (response) => {
        console.log('Subscription successful!', response);
        // Handle success (e.g., close the modal, display a message, etc.)
        this.closeModal()
      },
      error: (error) => {
        console.error('Subscription failed', error);
        // Handle error (e.g., display an error message)
      }
    });

  }
  closeToast(): void {
    const notificationToast = document.querySelector('.notification-toast');
    if (notificationToast) {
      notificationToast.classList.add('closed');
    }
  }

  ngOnInit(): void {
  }
  isModalClosed: boolean = false;
  email: string = '';

  closeModal() {
    this.isModalClosed = true;
  }

  openModal() {
    this.isModalClosed = false;
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
