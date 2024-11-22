import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const profile = document.querySelector('nav .profile');
    if (!profile) return; // Eğer profil öğesi bulunamazsa, işlemi sonlandır.

    const imgProfile = profile.querySelector('img');
    const dropdownProfile = profile.querySelector('.profile-link');

    if (imgProfile && dropdownProfile) {
      imgProfile.addEventListener('click', function () {
        dropdownProfile.classList.toggle('show');
      });
    }
  }
}
