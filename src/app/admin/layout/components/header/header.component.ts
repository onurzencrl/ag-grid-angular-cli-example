import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/components/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private _service : AuthService) { }
    
  

  onLogout() {
    this._service.logout();
  }

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
