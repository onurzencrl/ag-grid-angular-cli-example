import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/components/login/auth.service';

@Component({
  selector: 'app-user-info-sidebar',
  templateUrl: './user-info-sidebar.component.html',
  styleUrls: ['./user-info-sidebar.component.scss']
})
export class UserInfoSidebarComponent implements OnInit {

  constructor(private _service : AuthService) { }
  user : any;
  getUserInfo() {
    var userId = localStorage.getItem('userId');
    this._service.getUserById(userId!.toString()).subscribe((data: any) => {
      this.user = data;
    })
  }

  onLogout() {
    this._service.logout();
  }
  ngOnInit(): void {
    this.getUserInfo();
  }

}
