export class CouponModel {
    id: number = 0;
    name: string = '';
    couponCode: string = '';
    discountRate : number = 0;
    expirationDate: Date | null = null;
    isActive: boolean = false;
    isUsed: boolean = false;
    userId: string | null = ''; 
    orderId: string | null = '';
    minLimit: number = 0;
    usedDate: Date | null = null;
}

export class Coupon {
    items: CouponModel[] = [];
}

export class CouponCodeModel {
    id: number = 0;
    couponCode: string = '';
}
