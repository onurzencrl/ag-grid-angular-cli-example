export class CustomerModel {
    id: number = 0;
    name: string = '';
    description: string = '';
    price: number = 0;
    categoryId: number = 0;
  }

  export class Customer {
    items: CustomerModel[] = [];
  }