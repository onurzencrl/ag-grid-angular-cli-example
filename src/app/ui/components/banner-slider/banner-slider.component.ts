import { Component, OnInit } from '@angular/core';
import { BannersService } from 'src/app/admin/components/banners/banners.service';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss']
})
export class BannerSliderComponent implements OnInit {

  constructor(private _bannerService : BannersService) { }

  ngOnInit(): void {
    this.getBanners();
  }


  banners: any[] = [];
  getBanners() {
    this._bannerService.getBanners(0,10).subscribe(data => {
      this.banners = data.items;
  })

}
}
