import {Component, OnInit, Renderer2} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./admin/components/login/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {


     private intervalId: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Uygulama başladığında token kontrolü
    this.authService.checkTokenExpiration();

    // Her 30 saniyede bir token kontrolü
    this.intervalId = setInterval(() => {
      this.authService.checkTokenExpiration();
    }, 30000);
  }

  ngOnDestroy(): void {
    // Uygulama kapanırken interval temizleme
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
   
}