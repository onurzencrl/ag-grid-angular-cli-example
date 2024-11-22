import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductModel } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';
import { TagSpecificType } from '../category/category-model';
import { BasketitemModel } from 'src/app/admin/components/basketitem/basketitem-model';
import { BasketModel } from 'src/app/admin/components/basket/basket-model';
import { BasketitemService } from 'src/app/admin/components/basketitem/basketitem.service';
import { BasketService } from 'src/app/admin/components/basket/basket.service';
import { FavproductModel } from 'src/app/admin/components/favproduct/favproduct-model';
import { FavitemModel } from 'src/app/admin/components/favitem/favitem-model';
import { FavproductService } from 'src/app/admin/components/favproduct/favproduct.service';
import { FavitemService } from 'src/app/admin/components/favitem/favitem.service';
import { CommentService } from 'src/app/admin/components/comment/comment.service';
import { ProductimageService } from 'src/app/admin/components/productimage/productimage.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit , AfterViewInit , AfterViewChecked {

  product : ProductModel = new ProductModel();


  
  
  images: string[] = [
   
  ];

  currentImage: string = this.product.imageUrl;
  colors: string[] = ['#FFD700', '#C0C0C0', '#FF6347', '#4B0082', '#00FF00'];
  selectedColor: string = '#FFD700';
  quantity: number = 1;
  productList: any[] = [];
  TagSpecificType = TagSpecificType;

  constructor(private productImageService : ProductimageService , private favProductService: FavproductService, private commentService : CommentService ,private favItemService: FavitemService,    private route: ActivatedRoute, private productService : ProductService  , private basketItemService : BasketitemService , private basketService : BasketService  ) { }
  ngAfterViewChecked(): void {
    // setTimeout(() => {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // }, 2000); // Tarayıcı yüklendikten hemen sonra yukarı kaydırmak için
  }

  productId = '';
  ngOnInit(): void {
    // Scroll to the top of the page after a short delay
    setTimeout(() => {
      const element = document.getElementById('top');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 0); // 0 ms gecikmeyle çalıştır
  
    // Route parametreleri değiştiğinde ürün ID'sini yakala
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.productId = productId!;
      console.log('Product ID:', productId);
  
      // Ürün verisini al
      this.getProductById(productId);
      this.getProducts();
      this.getComments();
    });
  }
  
  comments: any[] = [];
  total : number = 0;
  getComments(){
    this.commentService.getComments(0, 10).subscribe((data: any) => {
      var userId = localStorage.getItem('userId');
      this.comments = data.items.filter((comment: any) =>  comment.productId == this.productId);
      this.total = this.comments.reduce((sum, comment) => sum + comment.rating, 0);

    });

  }

  getProducts(){
    this.productService.getProducts(0, 10).subscribe((data: Product) => {
      // this.products = data;
      this.productList = data.items.slice(0,4)

      
    });
  
  }

  addFav(product: ProductModel) {
    var userId = localStorage.getItem('userId');
    
    // Kullanıcının sepetini al
    this.favProductService.getFavproducts(0, 10).subscribe((response: any) => {
      const existingBasket = response.items.find((b: any) => b.userId == userId);
  
      if (existingBasket) {
        // Sepette aynı productId'ye sahip bir ürün olup olmadığını kontrol et
        this.favItemService.getFavitems(0,10).subscribe((favItems: any) => {
          const existingItem = favItems.items.find((item: any) => item.productId == product.id);
  
          if (existingItem) {
            // Eğer aynı ürün varsa, miktarı artır
            this.favItemService.updateFavitem(existingItem).subscribe(() => {
              this.favProductService.updateFavproduct(favItems.items.length);
              console.log('Ürün miktarı artırıldı');
            });
          } else {
            // Eğer aynı ürün yoksa, ürünü sepete ekle
            const basketItem: FavitemModel = {
              id: 0,
              basketId: existingBasket.id.toString(),
              productId: product.id.toString()
            };
            this.favItemService.createFavitem(basketItem).subscribe((res) => {
              this.favProductService.updateFavproduct(favItems.items.length + 1);

              console.log('Ürün sepete eklendi');
            });
          }
        });
      } else {
        // Sepet yoksa, yeni bir sepet oluştur
        const newBasket: FavproductModel = {
          userId: userId!.toString(),
          id: 0,
        };
        this.favProductService.createFavproduct(newBasket).subscribe((createdBasket: FavproductModel) => {
          const basketItem: FavitemModel = {
            id: 0,
            basketId: createdBasket.id.toString(),
            productId: product.id.toString(),
          };
          this.favItemService.createFavitem(basketItem).subscribe(() => {
            // this.favProductService.updateFavproduct(1);
            console.log('Yeni sepet oluşturuldu ve ürün sepete eklendi');
          });
        });
      }
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
              quantity: this.quantity
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
            quantity: this.quantity
          };
          this.basketItemService.createBasketitem(basketItem).subscribe(() => {
            this.basketService.updateBasketCount(1);
            console.log('Yeni sepet oluşturuldu ve ürün sepete eklendi');
          });
        });
      }
    });
  }

  getProductById(id: any): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        console.log('Product:', data);
        this.product = data;
        this.images = data.productImages.map((image: any) => image.imageUrl);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  changeImage(image: string): void {
    this.product.imageUrl = image;
  }

  changeColor(color: string): void {
    this.selectedColor = color;
    // Renk değişimi ile ilgili başka işlemler yapabilirsin
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToBag(): void {
    console.log(`${this.product.name} sepete eklendi.`);
  }
  contents = [
    { title: 'ÜRÜN ÖZELLİKLERİ', body: '<h1> TEST </h1>' },
  ];

  selectedTab = 0;
  lineWidth = 0;
  lineLeft = 0;

  selectTab(index: number) {
    this.selectedTab = index;
    this.updateLinePosition();
  }

  updateLinePosition() {
    const activeTab = document.querySelector('.tab.active') as HTMLElement;
    if (activeTab) {
      this.lineWidth = activeTab.offsetWidth;
      this.lineLeft = activeTab.offsetLeft;
    }

    // setTimeout(() => {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // }, 2000); // Tarayıcı yüklendikten hemen sonra yukarı kaydırmak için
  
  }

  ngAfterViewInit() {
    // İlk yüklemede çizgi pozisyonunu ayarla
    this.updateLinePosition();
    setTimeout(() => {
      const element = document.getElementById('top');
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 0); // 0 ms gecikmeyle çalıştır
  

  }
  @ViewChild('slider', { static: true }) slider!: ElementRef;

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }
}
