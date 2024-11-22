export class BasketitemModel {
    id: number = 0;
    basketId: string = '';
    productId: string = '';
    quantity: number = 0;
}

export class Basketitem {
    items: BasketitemModel[] = [];
}
