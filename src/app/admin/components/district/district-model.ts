export class DistrictModel {
    id: number = 0;
    name: string = '';
    cityId: number = 0;
    cityName: string = '';
  }

  export class District {
    items: DistrictModel[] = [];
  }