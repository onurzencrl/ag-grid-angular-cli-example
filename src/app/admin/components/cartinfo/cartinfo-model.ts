export class CartinfoModel {
    id: number = 0;
    cardholderName: string = '';
    cvv: string = '';
    userId: string = '';
    expirationDay: number = 0;
    expirationMonth: number = 0;
}

export class Cartinfo {
    items: CartinfoModel[] = [];
}
