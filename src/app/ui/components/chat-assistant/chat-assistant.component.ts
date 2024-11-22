import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-assistant',
  templateUrl: './chat-assistant.component.html',
  styleUrls: ['./chat-assistant.component.scss']
})
export class ChatAssistantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isOpen: boolean = false;
  isAssistanButton: boolean = true;

  toggleChat() {
    // Toggle the state of the chat window and the button visibility
    this.isOpen = !this.isOpen;
    this.isAssistanButton = !this.isAssistanButton;
    return this.isOpen && this.isAssistanButton; // Logical AND operation
  }
}
