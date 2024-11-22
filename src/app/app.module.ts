import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
// ag-grid
// application
import { AppComponent } from "./app.component";
// rich grid
import { UiModule } from "./ui/ui.module";
import { AdminModule } from "./admin/admin.module";
import { CustomerModule } from "./admin/components/customer/customer.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridAngular } from "ag-grid-angular";
import { ToastrModule } from "ngx-toastr";
import { DashboardComponent } from "./admin/components/dashboard/dashboard.component";
import { LayoutComponent } from "./admin/layout/layout.component";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./ui/components/home-page/home-page.component";
import { LoginComponent } from "./admin/components/login/login.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./admin/components/login/auth.interceptor";
import { Page404Component } from "./ui/components/page404/page404.component";


const routes: Routes = [
    {
      path: "admin", component: LayoutComponent, children: [
        // { path: '**', component: Page404Component } ,
        { path: "", component: DashboardComponent },
        { path: "customers", loadChildren: () => import("./admin/components/customer/customer.module").then(module => module.CustomerModule) },
        { path: "service", loadChildren: () => import("./admin/components/service/service.module").then(module => module.ServiceModule) },
        { path: "campaign", loadChildren: () => import("./admin/components/campaign/campaign.module").then(module => module.CampaignModule) },
        { path: "subscribers", loadChildren: () => import("./admin/components/subscriber/subscriber.module").then(module => module.SubscriberModule) },
        { path: "filter", loadChildren: () => import("./admin/components/filter/filter.module").then(module => module.FilterModule) },
        { path: "testimonial", loadChildren: () => import("./admin/components/testimonial/testimonial.module").then(module => module.TestimonialModule) },
        { path: "category", loadChildren: () => import("./admin/components/category/category.module").then(module => module.CategoryModule) },
        { path: "city", loadChildren: () => import("./admin/components/city/city.module").then(module => module.CityModule) },
        { path: "district", loadChildren: () => import("./admin/components/district/district.module").then(module => module.DistrictModule) },
        { path: "neighbourhood", loadChildren: () => import("./admin/components/neighbourhood/neighbourhood.module").then(module => module.NeighbourhoodModule) },
        { path: "products", loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) },
        { path: "posts", loadChildren: () => import("./admin/components/post/post.module").then(module => module.PostModule) },
        { path: "menus", loadChildren: () => import("./admin/components/menus/menus.module").then(module => module.MenusModule) },
        { path: "banners", loadChildren: () => import("./admin/components/banners/banners.module").then(module => module.BannersModule) },
        { path: "producttags", loadChildren: () => import("./admin/components/product-tag/product-tag.module").then(module => module.ProductTagModule) },
        { path: "social-links", loadChildren: () => import("./admin/components/social-links/social-links.module").then(module => module.SocialLinksModule) },
        { path: "productspecifictags", loadChildren: () => import("./admin/components/product-specific-tag/product-specific-tag.module").then(module => module.ProductSpecificTagModule) },
        { path: "orders", loadChildren: () => import("./admin/components/order/order.module").then(module => module.OrderModule) },
        { path: "productimage", loadChildren: () => import("./admin/components/productimage/productimage.module").then(module => module.ProductimageModule) },
        { path: "productdetail", loadChildren: () => import("./admin/components/productdetail/productdetail.module").then(module => module.ProductdetailModule) },
        { path: "contact", loadChildren: () => import("./admin/components/contact/contact.module").then(module => module.ContactModule) },
        { path: "coupon", loadChildren: () => import("./admin/components/coupon/coupon.module").then(module => module.CouponModule) },
      ]
    },
    // { path: '**', component: Page404Component } ,
    
    { path: "adminlogin", component: LoginComponent  },
    { path: "", component: HomePageComponent },
    { path: "", loadChildren: () => import("./ui/components/components.module").then(module => module.ComponentsModule) },
    { path: "products/:pageNo", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule) },
  ];
@NgModule({
    imports: [
    BrowserModule,
    FormsModule,
    UiModule,
    AdminModule,
    AgGridAngular,
    CustomerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)

],
    declarations: [
        AppComponent,
    ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
