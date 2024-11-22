// basket.component.ts
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BasketService } from 'src/app/admin/components/basket/basket.service';
import { BasketitemModel } from 'src/app/admin/components/basketitem/basketitem-model';
import { BasketitemService } from 'src/app/admin/components/basketitem/basketitem.service';
import { FavitemService } from 'src/app/admin/components/favitem/favitem.service';
import { FavproductService } from 'src/app/admin/components/favproduct/favproduct.service';
import { ProductModel } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';
import { TagSpecificType } from '../category/category-model';
import { Basket, BasketModel } from 'src/app/admin/components/basket/basket-model';

interface Product {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

@Component({
  selector: 'app-favproduct',
  templateUrl: './favproduct.component.html',
  styleUrls: ['./favproduct.component.scss']
})
export class FavproductComponent implements OnInit {
  favProducts: any[] = [];

  constructor(private favProductService: FavproductService, private basketService : BasketService, private basketItemService: BasketitemService   ,private subscriberService: SubscriberService,private favItemService: FavitemService, private productService : ProductService) {}
  subscriber: SubscriberModel = new SubscriberModel();

  TagSpecificType = TagSpecificType;
    onSubmitAboneOl(): void {
      this.subscriberService.createSubscriber(this.subscriber).subscribe({
        next: (response) => {
          console.log('Subscription successful!', response);
          // Handle success (e.g., close the modal, display a message, etc.)
        },
        error: (error) => {
          console.error('Subscription failed', error);
          // Handle error (e.g., display an error message)
        }
      });
    }
  ngOnInit() {
    this.loadFavorites();
  }

  deleteFavItem(productId: number) {
    this.favItemService.deleteFavitem(productId).subscribe(() => {
      this.loadFavorites();
    });

  }
  addBasket(product: ProductModel) {
    var userId = localStorage.getItem('userId');
    
    // Kullanıcının sepetini al
    this.basketService.getBaskets(0, 10).subscribe((response: any) => {
      const existingBasket = response.items.find((b: any) => b.userId == userId);
  
      if (existingBasket) {
        // Sepette aynı productId'ye sahip bir ürün olup olmadığını kontrol et
        this.basketItemService.getBasketitems(0,10).subscribe((basketItems: any) => {
          const existingItem = basketItems.items.find((item: any) => item.productId == product.id);
  
          if (existingItem) {
            // Eğer aynı ürün varsa, miktarı artır
            existingItem.quantity += 1;
            this.basketItemService.updateBasketitem(existingItem).subscribe(() => {
              this.basketService.updateBasketCount(basketItems.items.length);
              console.log('Ürün miktarı artırıldı');
            });
          } else {
            // Eğer aynı ürün yoksa, ürünü sepete ekle
            const basketItem: BasketitemModel = {
              id: 0,
              basketId: existingBasket.id.toString(),
              productId: product.id.toString(),
              quantity: 1
            };
            this.basketItemService.createBasketitem(basketItem).subscribe((res) => {
              this.basketService.updateBasketCount(basketItems.items.length + 1);

              console.log('Ürün sepete eklendi');
            });
          }
        });
      } else {
        // Sepet yoksa, yeni bir sepet oluştur
        const newBasket: BasketModel = {
          userId: userId!.toString(),
          couponId : null,

          id: 0,
        };
        this.basketService.createBasket(newBasket).subscribe((createdBasket: BasketModel) => {
          const basketItem: BasketitemModel = {
            id: 0,
            basketId: createdBasket.id.toString(),
            productId: product.id.toString(),
            quantity: 1
          };
          this.basketItemService.createBasketitem(basketItem).subscribe(() => {
            this.basketService.updateBasketCount(1);
            console.log('Yeni sepet oluşturuldu ve ürün sepete eklendi');
          });
        });
      }
    });
  }
  

  loadFavorites() {
    // Get the user's favorite products
    this.favProductService.getFavproducts(0, 10).subscribe((response: any) => {
      const userId = localStorage.getItem('userId');
      const favProductsForUser = response.items.filter((fav: any) => fav.userId === userId);
      
      if (favProductsForUser.length > 0) {
        this.favProducts = []; // Initialize the array to store favorite products with details
  
        this.favItemService.getFavitems(0, 100).subscribe((favItems: any) => {
          // Fetch the favorite items with product details
          favItems.items.forEach((favItem: any) => {
         
            this.productService.getProducts(0, 100).subscribe((products: any) => {
              const product = products.items.find((p: any) => p.id === favItem.productId);
              product.id=favItem.id;
              this.favProducts.push(
                product 
              );
            });
       
          });
        })


 
          // Fetch the product details for each favorite item
      }
    });
  }
  

  filterFavorites(filterType: string) {
    // Implement filtering logic based on filterType
    // You can either filter from `favProducts` array or make a new HTTP request based on filter type
    switch (filterType) {
      case 'all':
        this.loadFavorites(); // Load all
        break;
      case 'advantageous':
        // Filter advantageous products
        this.favProducts = this.favProducts.filter(p => p.isAdvantageous);
        break;
      case 'price-drop':
        // Filter products with price drop
        this.favProducts = this.favProducts.filter(p => p.hasPriceDrop);
        break;
      case 'coupon':
        // Filter coupon products
        this.favProducts = this.favProducts.filter(p => p.hasCoupon);
        break;
    }
  }

  removeFavorite(productId: number) {
    this.favProductService.deleteFavproduct(productId).subscribe(() => {
      this.favProducts = this.favProducts.filter(p => p.id !== productId);
      console.log('Product removed from favorites');
    });
  }

  addToCart(product: any) {
    // Implement add to cart functionality, as shown in your method
    this.favItemService.createFavitem({
      productId: product.id,
      basketId: 'currentBasketId', // Replace with actual basket ID
      id: 0
    }).subscribe(() => {
      console.log('Product added to cart');
    });
  }
}