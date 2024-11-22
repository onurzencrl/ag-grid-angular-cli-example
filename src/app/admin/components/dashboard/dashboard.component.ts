import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    this.initMenuToggle();
    this.initProgressBar();
  }

  initMenuToggle(): void {
    const allMenu = document.querySelectorAll('main .content-data .head .menu');

    allMenu.forEach(item => {
      const icon = item.querySelector('.icon');
      const menuLink = item.querySelector('.menu-link');

      icon?.addEventListener('click', function () {
        menuLink?.classList.toggle('show');
      });
    });

    window.addEventListener('click', function (e) {
      allMenu.forEach(item => {
        const icon = item.querySelector('.icon');
        const menuLink = item.querySelector('.menu-link');

        if (e.target !== icon && e.target !== menuLink) {
          menuLink?.classList.remove('show');
        }
      });
    });
  }

  initProgressBar(): void {
    const allProgress = document.querySelectorAll('main .card .progress');

    allProgress.forEach(item => {
      if (item instanceof HTMLElement) {
        item.style.setProperty('--value', item.dataset.value || '0');
      }
    });
  }
}
