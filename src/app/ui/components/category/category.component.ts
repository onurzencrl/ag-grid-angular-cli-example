import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/admin/components/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  categoryList : any[] = [];

  getCategories(){
    this.categoryService.getCategorys(0,8).subscribe((data: any) => {
      this.categoryList = data.items.filter((x: any) => x.parentCategoryId == 0 || x.parentCategoryId == null);
    });
  }


}
