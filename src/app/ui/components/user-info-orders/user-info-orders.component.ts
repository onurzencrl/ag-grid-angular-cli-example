import { Component, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/admin/components/comment/comment-model';
import { CommentService } from 'src/app/admin/components/comment/comment.service';
import { EnumOrderState, EnumPaymentTypes } from 'src/app/admin/components/order/order-model';
import { OrderService } from 'src/app/admin/components/order/order.service';
import { ReviewModel } from 'src/app/admin/components/review/review-model';
import { ReviewService } from 'src/app/admin/components/review/review.service';

@Component({
  selector: 'app-user-info-orders',
  templateUrl: './user-info-orders.component.html',
  styleUrls: ['./user-info-orders.component.scss']
})
export class UserInfoOrdersComponent implements OnInit {

  constructor(private orderService :OrderService, private commentService : CommentService, private reviewService : ReviewService) { }
  filteredOrders: any[] = [];

  ngOnInit(): void {
    this.getOrders();
  }
  orders: any[]= [];
  getOrders() {
    this.orderService.getOrders(0, 10).subscribe((data) => {
      this.orders = data.items;
      this.filterOrdersByStateAndPayment();
    });
  }

  orderState: EnumOrderState | null = null;
  paymentTypes: EnumPaymentTypes | null = null;

  EnumOrderState = EnumOrderState;
  EnumPaymentTypes = EnumPaymentTypes;

  getOrderStatus(orderState: EnumOrderState | null): string {
    if (orderState === null) {
      return 'Bilinmiyor';
    }
  
    switch (orderState) {
      case EnumOrderState.waiting:
        return 'Bekliyor';
      case EnumOrderState.Unpaid:
        return 'Ödenmemiş';
      case EnumOrderState.Completed:
        return 'Tamamlandı';
      default:
        return 'Bilinmiyor';
    }
  }
  getPaymentType(paymentTypes: EnumPaymentTypes | null): string {
    if (paymentTypes === null) {
      return 'Bilinmiyor';
    }
  
    switch (paymentTypes) {
      case EnumPaymentTypes.CreditCart:
        return 'Kredi Kartı';
      case EnumPaymentTypes.Eft:
        return 'Eft';

  
      default:
        return 'Bilinmiyor';
    }
  }
  

  filterOrders(state: EnumOrderState | null) {
    // Toggle logic: if the clicked filter is already active, set it to null (remove the filter)
    this.orderState = this.orderState === state ? null : state;
    this.filterOrdersByStateAndPayment();
  }
  
  filterPayments(type: EnumPaymentTypes | null) {
    // Toggle logic: if the clicked filter is already active, set it to null (remove the filter)
    this.paymentTypes = this.paymentTypes === type ? null : type;
    this.filterOrdersByStateAndPayment();
  }
  filterOrdersByStateAndPayment() {
    this.filteredOrders = this.orders.filter(order => {
      const stateMatches = this.orderState === null || order.orderState === this.orderState;
      const paymentMatches = this.paymentTypes === null || order.paymentType === this.paymentTypes;
      return stateMatches && paymentMatches;
    });
  }


  showReviewModal: boolean = false;
  selectedRating: number = 0;
  reviewComment: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedProduct: any;

  // Modal açılırken hangi ürün için değerlendirme yapıldığını ayarlıyoruz
  openReviewModal(product: any): void {
    this.selectedProduct = product;
    this.showReviewModal = true;


  }

  // Modalı kapatmak için
  closeReviewModal(): void {
    this.showReviewModal = false;
    this.selectedRating = 0;  // Yıldızları sıfırlama
    this.reviewComment = '';  // Yorumu sıfırlama
  }

  // Yıldız seçimi fonksiyonu
  selectRating(star: number): void {
    this.selectedRating = star;
  }

  // Yorumu gönderme fonksiyonu
  submitReview(): void {
    if (this.selectedRating === 0 || this.reviewComment.trim() === '') {
      alert('Lütfen yıldız verin ve yorum yazın.');
      return;
    }
    let commentModel : CommentModel = new CommentModel(); 
    commentModel.productId = this.selectedProduct.productId;
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
          this.closeReviewModal();
        });
      });

   
    this.closeReviewModal();
  }
}
