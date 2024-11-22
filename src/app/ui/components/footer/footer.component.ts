import { Component, OnInit } from '@angular/core';
import { Category, CategoryModel } from 'src/app/admin/components/category/category-model';
import { CategoryService } from 'src/app/admin/components/category/category.service';
import { Contact } from 'src/app/admin/components/contact/contact-model';
import { ContactService } from 'src/app/admin/components/contact/contact.service';
import { Product } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';
import { ServiceService } from 'src/app/admin/components/service/service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _categoryService : CategoryService, private _contactService : ContactService, private servicesService:ServiceService , private _productService : ProductService) { }

  ngOnInit(): void {
    this.getCategorys();
    this.getServices();
    this.getContacts();
  }

  categoryList: CategoryModel[] = [];
  parentCategories: CategoryModel[] = [];
  childCategories: { [key: number]: CategoryModel[] } = {};  getCategorys(){
    this._categoryService.getCategorys(0, 10).subscribe((data: Category) => {
      this.categoryList = data.items;
      this.parentCategories = this.categoryList.filter(cat => cat.parentCategoryId === null);
      this.childCategories = this.categoryList
        .filter(cat => cat.parentCategoryId !== 0)
        .reduce((acc: { [key: number]: CategoryModel[] }, cat) => {
          if (!acc[cat.parentCategoryId]) {
            acc[cat.parentCategoryId] = [];
          }
          acc[cat.parentCategoryId].push(cat);
          return acc;
        }, {});
    });
  }

  services: any[] = [];
  getServices(){
    this.servicesService.getServices(0,10).subscribe((data: any) => {
      this.services = data.items;
    });
  }
  bestSellerList: any[] = []; 
  getProducts(){
    this._productService.getProducts(0, 10).subscribe((data: Product) => {

      this.bestSellerList = data.items.filter(item => item.tagId === 'bc7dfd91-6e72-4403-1d53-08dcbbae1220').slice(0, 5);
    

      
    });
  
  }
  contactList: any[] = [];
  getContacts(){
    this._contactService.getContacts(0, 10).subscribe((data: any) => {
      this.contactList = data.items;
    });
  }


}
