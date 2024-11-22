export class CategoryModel {
    id: number = 0;
    name: string = '';
    parentName: string = '';
    description: string = '';
    imageUrl: string = '';
    price: number = 0;
    parentCategoryId: number = 0;
  }

  export class Category {
    items: CategoryModel[] = [];
  }