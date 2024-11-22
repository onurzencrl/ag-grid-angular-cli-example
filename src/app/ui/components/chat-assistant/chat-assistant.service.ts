import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatAssistantService {
 // Observable to track chat open/close state
 private chatOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 private assistantButtonVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

 // Public observables for components to subscribe to
 chatOpen$ = this.chatOpenSubject.asObservable();
 assistantButtonVisible$ = this.assistantButtonVisibleSubject.asObservable();


 // Method to toggle the chat open state
 toggleChat(): void {
   const isOpen = this.chatOpenSubject.value;
   this.chatOpenSubject.next(!isOpen); // Toggle state
 }

 // Method to toggle the assistant button state
 toggleAssistantButton(): void {
   const isVisible = this.assistantButtonVisibleSubject.value;
   this.assistantButtonVisibleSubject.next(!isVisible); // Toggle state
 }

 // Optionally, you can implement logic to reset both
 reset(): void {
   this.chatOpenSubject.next(false);
   this.assistantButtonVisibleSubject.next(true);
 }
  constructor() { }
}
