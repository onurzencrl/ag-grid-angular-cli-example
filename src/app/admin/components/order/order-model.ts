import { CouponModel } from "../coupon/coupon-model";
import { OrderdetailModel } from "../orderdetail/orderdetail-model";

export class OrderModel {
    id: number = 0;
    status: number = 0;
    userId: string | null = '';
    couponId: string | null = null;
    orderNote: string | null = '';
    totalPrice: number | null = 0;
    orderDate: Date | null = null;
    orderNumber: string | null = '';
    orderState: number | null = 0;
    paymentTypes: number | null = 0;
    price: number = 0;
    coupon: CouponModel = new CouponModel();
    orderDetails: OrderdetailModel[] = [];
    
  }

  export class Order {
    items: OrderModel[] = [];
  }

  export enum EnumOrderState {
    waiting = 0,
    Unpaid = 1,
    Completed = 2
  }
  
  export enum EnumPaymentTypes {
    CreditCart = 0,
    Eft = 1
  }
  