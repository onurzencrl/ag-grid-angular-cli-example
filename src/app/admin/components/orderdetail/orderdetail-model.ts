import { Product, ProductModel } from "../products/product-model";

export class OrderdetailModel {
    id: number = 0;
    totalPrice: number = 0;
    count: number = 0;
    orderId: string = '';
    commentId : string | null = null;
    productId: string = '';
    reviewId: string | null = null;
    product?: ProductModel = new ProductModel();
}

export class Orderdetail {
    items: OrderdetailModel[] = [];
}
