export class BasketModel {
    id: number = 0;
    userId: string = '';
    couponId: string | null = '';
}

export class Basket {
    items: BasketModel[] = [];
}
