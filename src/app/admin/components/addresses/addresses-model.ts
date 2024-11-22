export class AddressesModel {
    id: number = 0;
    name: string = '';
    firstName: string = '';
    lastName: string = '';
    street: string = '';
    city: string = '';
    district: string = '';
    state: string = '';
    detailedAddress: string = '';
    titleOfAddress: string = '';
    neighbourhoodId: number = 0;
    cityId: number = 0;
    districtId: number = 0;
    choosedAddress: boolean = false;
}

export class Addresses {
    items: AddressesModel[] = [];
}
