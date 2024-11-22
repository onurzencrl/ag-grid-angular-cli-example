import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';
import { ChatAssistantService } from '../chat-assistant/chat-assistant.service';

@Component({
  selector: 'app-subscribe-popup',
  templateUrl: './subscribe-popup.component.html',
  styleUrls: ['./subscribe-popup.component.scss']
})
export class SubscribePopupComponent implements OnInit {

  constructor(private toastr: ToastrService , private subscriberService: SubscriberService , private chatAssistantService: ChatAssistantService) {

  }

  isModalClosed: boolean = false;

  closeModal() {
    this.isModalClosed = true;
  }
  subscriber: SubscriberModel = new SubscriberModel();
  userId = localStorage.getItem('userId');
  ngOnInit(): void {

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
}
