export class ProductimageModel {
    id: number = 0;
    imageUrl: string = '';
    productId: string = '';
    productName: string = '';

}

export class Productimage {
    items: ProductimageModel[] = [];
}
