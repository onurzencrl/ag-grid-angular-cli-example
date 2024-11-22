export class BannerModel {
    id: number = 0;
    subtitle: string = '';
    title: string = '';
    bannerText: string = '';
    imageUrl: string = '';
    buttonLink: string = '';
    buttonText: string = '';
  }

  export class Banner {
    items: BannerModel[] = [];
  }