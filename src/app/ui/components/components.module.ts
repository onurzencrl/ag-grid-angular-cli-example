import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketModule } from './basket/basket.module';
import { TopHeaderComponent } from './top-header/top-header.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { BannerSliderComponent } from './banner-slider/banner-slider.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { CategoryComponent } from './category/category.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { ArrivalsTrendingTopratedComponent } from './arrivals-trending-toprated/arrivals-trending-toprated.component';
import { DealofthedayComponent } from './dealoftheday/dealoftheday.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ServicesTestimonialsComponent } from './services-testimonials/services-testimonials.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';



@NgModule({
  declarations: [
    TopHeaderComponent,
    NavComponent,
    HeaderComponent,
    BannerSliderComponent,
    ProductSliderComponent,
    CategoryComponent,
    BestSellersComponent,
    ArrivalsTrendingTopratedComponent,
    DealofthedayComponent,
    BlogsComponent,
    ServicesTestimonialsComponent,
    FooterComponent,
    HomePageComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketModule
  ],
  exports : [HomeComponent , HomePageComponent]
})
export class ComponentsModule { }
