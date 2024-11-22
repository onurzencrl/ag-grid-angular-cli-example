import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CustomerModule } from './customer/customer.module';
import { LoginModule } from './login/login.module';
import { ImageCellRendererComponent } from './image-cell-renderer/image-cell-renderer.component';
import { Subscriber } from 'rxjs';
import { SubscriberModule } from './subscriber/subscriber.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { ServiceModule } from './service/service.module';
import { Campaign } from './campaign/campaign-model';
import { CampaignModule } from './campaign/campaign.module';
import { BasketModel } from './basket/basket-model';
import { BasketModule } from './basket/basket.module';
import { BasketitemModule } from './basketitem/basketitem.module';
import { FavproductModule } from './favproduct/favproduct.module';
import { FavitemModule } from './favitem/favitem.module';
import { PostModule } from './post/post.module';
import { Review } from './review/review-model';
import { ReviewModule } from './review/review.module';
import { FootercontactModule } from './footercontact/footercontact.module';
import { Passedsearch } from './passedsearch/passedsearch-model';
import { PassedsearchModule } from './passedsearch/passedsearch.module';
import { ContactsettingModule } from './contactsetting/contactsetting.module';
import { OrderdetailModule } from './orderdetail/orderdetail.module';
import { Coupon } from './coupon/coupon-model';
import { CouponModule } from './coupon/coupon.module';
import { CartinfoModule } from './cartinfo/cartinfo.module';
import { ContactModule } from './contact/contact.module';



@NgModule({
  declarations: [
    ImageCellRendererComponent,
  ],
  imports: [
    CommonModule,
    ProductsModule,
    FavproductModule,
    FavitemModule,
    BasketModule,
    BasketitemModule,
    OrderModule,
    LoginModule,
    CampaignModule,
    OrderdetailModule,
    TestimonialModule,
    SubscriberModule,
    CouponModule,
    FootercontactModule,
    PassedsearchModule,
    ContactsettingModule,
    ContactModule,
    ServiceModule,
    DashboardModule,
    PostModule,
    CartinfoModule,
    ReviewModule,
    CustomerModule
  ]
})
export class ComponentsModule { }
