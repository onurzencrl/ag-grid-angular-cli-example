import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule
    ,
    RouterModule.forChild([
      {path :"" ,component : HomePageComponent},
      {path :"detail" ,component : ProductDetailComponent}
    ])
  ]
})
export class ProductsModule { }
