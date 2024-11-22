import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
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
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { FavproductComponent } from './favproduct/favproduct.component';
import { Page404Component } from './page404/page404.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoProfileComponent } from './user-info-profile/user-info-profile.component';
import { UserInfoOrdersComponent } from './user-info-orders/user-info-orders.component';
import { UserInfoReviewsComponent } from './user-info-reviews/user-info-reviews.component';
import { UserInfoSidebarComponent } from './user-info-sidebar/user-info-sidebar.component';
import { UserInfoChangePasswordComponent } from './user-info-change-password/user-info-change-password.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyaddressesComponent } from './myaddresses/myaddresses.component';
import { ChatAssistantComponent } from './chat-assistant/chat-assistant.component';
import { BoughtAnItemComponent } from './bought-an-item/bought-an-item.component';
import { SubscribePopupComponent } from './subscribe-popup/subscribe-popup.component';
import { ProductFilteredComponent } from './product-filtered/product-filtered.component';
import { MobilUserOptionsComponent } from './mobil-user-options/mobil-user-options.component';



@NgModule({
  declarations: [
    TopHeaderComponent,
    BasketComponent,
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
    ProductDetailComponent,
    LoginComponent,
    SignupComponent,
    ProductsDetailsComponent,
    FavproductComponent,
    Page404Component,
    BlogDetailComponent,
    UserInfoSidebarComponent,
    UserInfoReviewsComponent,
    UserInfoOrdersComponent,
    UserInfoComponent,
    UserInfoProfileComponent,
    UserInfoChangePasswordComponent,
    MyaddressesComponent,
    ChatAssistantComponent,
    BoughtAnItemComponent,
    SubscribePopupComponent,
    ProductFilteredComponent,
    MobilUserOptionsComponent
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path :"" ,component : HomePageComponent},
      { path: 'product/detail/:id', component: ProductsDetailsComponent },
      {path :"basket" ,component : BasketComponent},
      {path :"favproduct" ,component : FavproductComponent},
      {path :"login" ,component : LoginComponent},
      {path :"signup" ,component : SignupComponent},
      { path: 'blog-detail/:id', component: BlogDetailComponent },
      { path: "profile", component: UserInfoComponent },
      { path: "user-info", component: UserInfoProfileComponent },
      { path: "user-change-password", component: UserInfoChangePasswordComponent },
      { path: "myaddresses", component: MyaddressesComponent },
      { path: "orders", component: UserInfoOrdersComponent },
      { path: "product-filtered/:id", component: ProductFilteredComponent },
      { path: "reviews", component: UserInfoReviewsComponent }
    ])
  ],
  exports : [TopHeaderComponent]
})
export class ComponentsModule { }
