export class CityModel {
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    categoryId: number = 0;
  }

  export class City {
    items: CityModel[] = [];
  }