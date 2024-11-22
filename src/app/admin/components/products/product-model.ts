import { KodListModel } from "src/app/onur-table/onur-model";
import { ProductimageModel } from "../productimage/productimage-model";
import { ProductdetailModel } from "../productdetail/productdetail-model";

export class ProductModel {
    id: number = 0;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    secondImageUrl: string = '';
    specificTagName: string = '';
    tagName: string = '';
    renk: string = '';
    categoryName: string = '';
    price: number = 0;
    deletedPrice: number = 0;
    dealOfTheDay: boolean = false;
    stockQuantity: number = 0;
    categoryId: string = '';
    tagId: string = '';
    productSpecificTagId: string = '';
    productDetailText: string = '';
    productImages : ProductimageModel[] = [];
    productDetails : ProductdetailModel[] = [];
  }

  export class Product {
    items: ProductModel[] = [];
  }

  export class FilterModel {
    field: string = '';
    operator: string = '';
    value: string = '';
    logic: string = '';
    filters?: FilterModel[] = [];
  }
  export class OneFilterModel {
    field: string = '';
    operator: string = '';
    value: string = '';
    logic: string = '';
  }