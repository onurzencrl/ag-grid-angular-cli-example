import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bought-an-item',
  templateUrl: './bought-an-item.component.html',
  styleUrls: ['./bought-an-item.component.scss']
})
export class BoughtAnItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closeToast(): void {
    const notificationToast = document.querySelector('.notification-toast');
    if (notificationToast) {
      notificationToast.classList.add('closed');
    }
  }
}
