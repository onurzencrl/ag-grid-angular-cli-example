import { Component, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/admin/components/comment/comment-model';
import { CommentService } from 'src/app/admin/components/comment/comment.service';
import { EnumOrderState } from 'src/app/admin/components/order/order-model';
import { OrderService } from 'src/app/admin/components/order/order.service';
import { ReviewModel } from 'src/app/admin/components/review/review-model';
import { ReviewService } from 'src/app/admin/components/review/review.service';

@Component({
  selector: 'app-user-info-reviews',
  templateUrl: './user-info-reviews.component.html',
  styleUrls: ['./user-info-reviews.component.scss']
})
export class UserInfoReviewsComponent implements OnInit {
  openReviewModal(product: any): void {
    this.selectedProduct = product;
    this.showReviewModal = true;


  }
  reviews: any[] = [];
  pendingReviews: any[] = [];
  notRevieweds: any[] = [];
  reviewedItems: any[] = [];
  showReviewModal: boolean = false;
  selectedRating: number = 0;
  reviewComment: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedProduct: any;
  // Example tabs, dynamically updated
  tabs = [
    {
      title: 'Değerlendirme Bekleyenler',
    },
    {
      title: 'Değerlendirdiklerim',
    }
  ];

  activeTab = 0; // Default to first tab
  
  constructor(private reviewService: ReviewService , private orderService : OrderService , private commentService : CommentService) {}

  ngOnInit(): void {
    this.getReviews();
    this.getOrders();
  }

  orders: any[]= [];
  getOrders() {
    this.orderService.getOrders(0, 10).subscribe((data) => {
      this.pendingReviews = data.items.filter(order => order.orderState === EnumOrderState.Completed);
      this.pendingReviews.forEach(order => {
        order.orderDetails.forEach((orderDetail : any) => {
          if(this.productIdList.includes(orderDetail.product?.id))
          {
            if(!this.reviewedItems.find(review => review.productId === orderDetail.product?.id))
            {
              this.reviewedItems.push(orderDetail)
            }
          }
          else
          {
            if(!this.notRevieweds.find(review => review.productId === orderDetail.product?.id))
            {
              this.notRevieweds.push(orderDetail)
            }
          }
        });
    });
  })

}

// Yıldız seçimi fonksiyonu
selectRating(star: number): void {
  this.selectedRating = star;
}

  // Modalı kapatmak için
  closeReviewModal(): void {
    this.showReviewModal = false;
    this.selectedRating = 0;  // Yıldızları sıfırlama
    this.reviewComment = '';  // Yorumu sıfırlama
  }


// Yorumu gönderme fonksiyonu
submitReview(): void {
  if (this.selectedRating === 0 || this.reviewComment.trim() === '') {
    alert('Lütfen yıldız verin ve yorum yazın.');
    return;
  }
  let commentModel : CommentModel = new CommentModel(); 
  commentModel.productId = this.selectedProduct.id;
  commentModel.rating = this.selectedRating;
  commentModel.userId = localStorage.getItem('userId') || '';
  commentModel.content = this.reviewComment;
  this.commentService.createComment(commentModel)
    .subscribe((res) => {
      let reviewModel = new ReviewModel();
      reviewModel.productId = commentModel.productId;
      reviewModel.userId = localStorage.getItem('userId') || '';
      reviewModel.averageRating = commentModel.rating
      reviewModel.commentId = res.id.toString();
      this.reviewService.createReview(reviewModel).subscribe(() => {
        alert('Değerlendirme başarıyla gönderildi.');
        this.pendingReviews = []
        this.notRevieweds = []
        this.reviewedItems = []
        this.orders = []
        this.reviews = []
        this.getReviews();
        this.getOrders();
        this.closeReviewModal();
      });
    });

 
  this.closeReviewModal();
}

productIdList : any[] = [];

  getReviews() {
    this.reviewService.getReviews(0, 10).subscribe((data) => {
      this.reviews = data.items;
      this.productIdList = data.items.map(review => review.productId);
      // Separate the reviews into pending and reviewed
      // this.pendingReviews = this.reviews.filter(review => review.status === 'pending');
      // this.reviewedItems = this.reviews.filter(review => review.status === 'reviewed');
      
      // Update tab titles dynamically
      this.tabs[0].title = `Değerlendirme Bekleyenler (${this.pendingReviews.length})`;
      this.tabs[1].title = `Değerlendirdiklerim (${this.reviewedItems.length})`;
    });
  }

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}