// basket.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AddressesService } from 'src/app/admin/components/addresses/addresses.service';
import { BasketService } from 'src/app/admin/components/basket/basket.service';
import { BasketitemModel } from 'src/app/admin/components/basketitem/basketitem-model';
import { BasketitemService } from 'src/app/admin/components/basketitem/basketitem.service';
import { CartinfoModel } from 'src/app/admin/components/cartinfo/cartinfo-model';
import { CartinfoService } from 'src/app/admin/components/cartinfo/cartinfo.service';
import { CityService } from 'src/app/admin/components/city/city.service';
import { CouponModel } from 'src/app/admin/components/coupon/coupon-model';
import { CouponService } from 'src/app/admin/components/coupon/coupon.service';
import { DistrictService } from 'src/app/admin/components/district/district.service';
import { NeighbourhoodService } from 'src/app/admin/components/neighbourhood/neighbourhood.service';
import { Order, OrderModel } from 'src/app/admin/components/order/order-model';
import { OrderService } from 'src/app/admin/components/order/order.service';
import { OrderdetailService } from 'src/app/admin/components/orderdetail/orderdetail.service';
import { ProductModel } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';
import { SubscriberModel } from 'src/app/admin/components/subscriber/subscriber-model';
import { SubscriberService } from 'src/app/admin/components/subscriber/subscriber.service';

interface Product {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
coupenCode: string = "";


editAdress(id:number) {
    this.showAddressPopup = true;
    this.adressesService.getAddressesByAddressId(id.toString()).subscribe((response: any) => {
        this.addressForm.patchValue(response);
        this.addressForm
    })
}

selectTab(tab: string) {
  this.selectedTab = tab;
}

// Method to handle installment selection
selectInstallment(option: any) {
  console.log('Selected Installment:', option);
}
AddNewAddress() {
    this.showAddressPopup = true;
    this.getAdresses();
}
cartInfoForm!: FormGroup;


initFormCartInfo(): void {
  this.cartInfoForm = this.fb.group({
    cardholderName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    expirationDay: ['', Validators.required],
    expirationMonth: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3)]],
    use3DSecure: [false]
  });
}

    cardholderName: string = '';
    cardNumber: string = '';
    expiryDay: number | null = null;
    expiryMonth: number | null = null;
    cvv: string = '';

    ngOnInit(): void {  
        this.loadBasketItems()
        this.initForm(); // Formu başlat
        this.initFormCartInfo(); // Formu başlat
        this.getCities();
        this.getDistricts();
        this.getNeighbourhoods();
        this.getAdresses();
    }

    addressForm!: FormGroup; // Reactive Form Grubu

    // Formu başlatan fonksiyon
    initForm() {
      this.addressForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        id: [''],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        cityId: [''],
        districtId: [''],
        neighbourhoodId: [''],
        detailedAddress: ['', Validators.required],
        titleOfAddress: ['', Validators.required]
      });


    }
    // selectedTab: number = 0;

    selectedTab: string = 'address'; // default tab

    installmentOptions = [
      { months: 1, price: 649.90 },
      { months: 2, price: 346.82 },
      { months: 3, price: 235.98 },
      { months: 4, price: 180.71 }
      // Additional options...
    ];

    chooseAddress(addressId: number) {
      // Öncelikle tüm adreslerin choosedAddress'ini false yapıyoruz.
      this.addresses.forEach(address => {
        if (address.id === addressId) {
          address.choosedAddress = true;  // Seçilen adresi işaretle
          this.adressesService.updateAddresses(address).subscribe(
            (response) => {
              console.log('Adresler güncellendi');
            },
            (error) => {
              console.error('Güncelleme sırasında hata oluştu', error);
            }
          );
        } else {
          address.choosedAddress = false; // Diğerlerini false yap
             // Backend'e güncelleme isteği göndermek
          this.adressesService.updateAddresses(address).subscribe(
            (response) => {
              console.log('Adresler güncellendi');
            },
            (error) => {
              console.error('Güncelleme sırasında hata oluştu', error);
            }
          );
        }
      });
    
   
    }

    onSubmitCartInfo(): void {
        const formValue = this.cartInfoForm.value;
        const cartInfo: CartinfoModel = {
          id: 0, // Yeni bir kart olduğu için ID sıfır.
          cardholderName: formValue.cardholderName,
          cvv: formValue.cvv,
          userId: localStorage.getItem('userId') || '',
          expirationDay: formValue.expirationDay,
          expirationMonth: formValue.expirationMonth
        };
  
        this.cartinfoService.createCartinfo(cartInfo).subscribe(
          response => {
            console.log('Kart bilgileri başarıyla kaydedildi', response);
            this.confirmOrder();
          },
          error => {
            console.error('Kart bilgileri kaydedilirken hata oluştu', error);
          }
        );
      
    }
    
    onSubmitAddress() {
      console.log(this.addressForm.value);
      if(this.addressForm.value.id)
      {
 
          const newAddress = this.addressForm.value; // Form verilerini al
          this.adressesService.updateAddresses(newAddress).subscribe(response => {
            console.log('Adres başarıyla güncellendi:', response);
            this.getAdresses();
            this.showAddressPopup = false;
            this.addressForm.reset();

          }, error => {
            console.error('Adres güncellenirken hata oluştu:', error);
          });
      
      }
      else
      {
          if (this.addressForm.valid) {
            const newAddress = this.addressForm.value; // Form verilerini al
            newAddress.userId = localStorage.getItem('userId');
            this.adressesService.createAddresses(newAddress).subscribe(response => {
              console.log('Adres başarıyla kaydedildi:', response);
              this.getAdresses();
              this.showAddressPopup = false;
              this.addressForm.reset();
            }, error => {
              console.error('Adres kaydedilirken hata oluştu:', error);
            });
          } else {
            console.log("Form geçerli değil");
          }
      }
    }
  

    showPopup: boolean = false;
    showCompleteOrder: boolean = false;
    showCartSection: boolean = true;

    confirmOrder() {
      if(this.basketItems.length> 0)
      {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          // Eğer kullanıcı giriş yapmamışsa popup'ı göster
          this.showPopup = true;
        } else {
          this.adressesService.getAddressesById(userId).subscribe(
            (response: any) => {
              if (response !=  null && response != undefined) {
                this.completeOrder();
                this.showCompleteOrder = true;
                this.showCartSection = false;
              } else {
                this.showAddressPopup = true;
              }
            },
            (error) => {
              // Hata durumu yönetimi
              if (error.status === 500) {
                console.error('500 Internal Server Error:', error);
                // 500 hatası olduğunda ne yapılacağına dair işlemler
                this.showAddressPopup = true; // Örneğin adres pop-up'ını yine de göster
              } else {
                console.error('Diğer Hata:', error);
                // Diğer hatalar için farklı işlemler
              }
            }
          );
          
         
        }

      }
      else
      {
        alert("Sepetinizde ürün bulunmamaktadır.")
      }
    }

    shippingCost: number = 39.99;


    
  

    isUniquePopupVisible: boolean = false;
    isUniquePopupSuccess: boolean = false;
  
    displayUniquePopup(isSuccessful: boolean, coupon?: CouponModel) {
      this.isUniquePopupVisible = true;
      this.isUniquePopupSuccess = isSuccessful;
      if (isSuccessful) {
        coupon!.isUsed = true;

        this.couponService.updateCoupon(coupon!).subscribe({
          next: () => {
            console.log('Coupon updated successfully');
            this.necesseryBasket.couponId = coupon!.id.toString();
            this.basketService.updateBasket(this.necesseryBasket).subscribe(() => {
              
            });
          },
          error: (error) => {
            console.error('Error updating coupon:', error);
          }
        });

      }
    }
  
    hideUniquePopup() {
      this.isUniquePopupVisible = false;
    }

    shippingFee: number = 39.99; // Kargo ücreti
    appliedCoupon: CouponModel | null = null; // Uygulanan kupon
    isCouponExist: CouponModel | null = null; // Uygulanan kupon
  
    // Ürünlerin toplamını hesapla
    getSubtotal(): number {
      // if(this.necesseryBasket.couponId)
      // {
      //   if(this.isCouponExist)
      //   {
      //     return this.basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0) - this.basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0) * (this.isCouponExist!.discountRate / 100);

      //   }
      //   return this.basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

      // }        
      // else
      // {
        return this.basketItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

      // }
    }
  
    // Kargo ücretini getir
    getShippingFee(): number {
      return this.shippingFee;
    }
  
    // İndirimi hesapla
    getTotalDiscount(): number {
      let subtotal = this.getSubtotal();
      
      if (this.necesseryBasket.couponId) {
        if (this.isCouponExist && this.isCouponExist.isActive && this.isCouponExist.expirationDate) {
          const currentDate = new Date();
          // Check if the coupon is still active and not expired
          // if (this.isCouponExist.expirationDate >= currentDate) {
            subtotal = subtotal * (this.isCouponExist.discountRate / 100);
          // }
        }
      }
    
      return subtotal;
    }
    
    // Genel toplamı hesapla
    getGrandTotal(): number {
      return this.getSubtotal() - this.getTotalDiscount() + this.getShippingFee();
    }
  
    // Kuponun geçerliliğini kontrol et
    isCouponValid(coupon: CouponModel): boolean | null {
      const now = new Date();
      return (
        coupon.isActive &&
        !coupon.isUsed &&
        coupon.minLimit <= this.getSubtotal()
      );
    }
  
    // Kuponu uygula
    applyCoupon(couponCode: string) {
      this.couponService.getCouponById(couponCode).subscribe({
        next: (coupon: CouponModel) => {
          if (this.isCouponValid(coupon)) {
            this.appliedCoupon = coupon;
            this.displayUniquePopup(true , coupon); // Başarılı popup
          } else {
            this.displayUniquePopup(false); // Hata popup
          }
        },
        error: () => {
          this.displayUniquePopup(false); // Hata popup
        }
      });
    }
    
    
    closePopup() {
      this.showPopup = false;
    }
  
    continueWithoutLogin() {
      // Üye olmadan devam etme işlemi
      console.log('Üye olmadan devam ediliyor...');
      this.closePopup();
    }
  
    goToLogin() {
      // Giriş yap veya üye ol sayfasına yönlendir
      window.location.href = '/login';
    }
  
    completeOrder(): void {
      let order : OrderModel = new OrderModel();
      order.userId = localStorage?.getItem('userId');
      order.price = this.basketItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      order.status = 1;
   this.orderService.createOrder(order).subscribe({
        next: (response) => {
          console.log('Order successful!', response);
          this.basketItems.forEach((item) => {
            this.orderDetailService.createOrderdetail({ id:0 , totalPrice : 0, orderId: response.id.toString(), productId: item.product.id.toString(), count: item.quantity, commentId: null , reviewId : null}).subscribe({
              next: (response) => {
                console.log('Order detail successful!', response);
              },
              error: (error) => {
                console.error('Order detail failed', error);
              }
            });
          });
        },
        error: (error) => {
          console.error('Order failed', error);
          // Handle error (e.g., display an error message)
        }
      });
    }
    products: Product[] = [
        { name: 'Green Tomatoes 1 Kilo', price: 1.25, quantity: 1, image: './assets/frontassets/assets/images/products/shirt-2.jpg' },
        // Diğer ürünler buraya eklenebilir
    ];

    subtotal: number = 0;
    taxRate: number = 0.05;
    tax: number = 0;
    shipping: number = 0;
    total: number = 0;
    discountToken: string = '';
    showAccountPopup: boolean = false;
    showAddressPopup: boolean = false;
  
    constructor(private subscriberService: SubscriberService , private orderService : OrderService ,private couponService :CouponService , private cartinfoService : CartinfoService,private orderDetailService : OrderdetailService , private cityService: CityService , private neighbourhoodService: NeighbourhoodService , private districtService: DistrictService , private fb: FormBuilder, private basketService: BasketService  , private adressesService: AddressesService  , private productService: ProductService , private basketItemService: BasketitemService) { 

    }
    addresses: any[] = [];
    getAdresses() {
        this.adressesService.getAddressess(0, 100).subscribe((response: any) => {
          this.addresses = response.items;
        });
      }

    openAddressPopup() {
        this.showAccountPopup = false; // Hesap kontrol popup'ını kapat
        this.showAddressPopup = true; // Adres ekleme popup'ını aç
        this.showPopup = false;
      }
    
      closeAddressPopup() {
        this.showAddressPopup = false;
        this.addressForm.reset();

      }

    subscriber: SubscriberModel = new SubscriberModel();
      cityList: any[] = [];
      districtList: any[] = [];
      neighbourhoodList: any[] = [];
      getCities() {
        this.cityService.getCitys(0, 100).subscribe((response: any) => {
          this.cityList = response.items;
        });
      }

      getDistricts() {
        this.districtService.getDistricts(0, 100).subscribe((response: any) => {
          this.districtList = response.items;
        });
      }

      getNeighbourhoods() {
        this.neighbourhoodService.getNeighbourhoods(0, 100).subscribe((response: any) => {
          this.neighbourhoodList = response.items;
        });
      }

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

      startShopping() {
        // Alışverişe yönlendirme fonksiyonu
        window.location.href = '/'; // Alışveriş sayfasına yönlendir
      }
    
    
    basketItems: Array<{ product: ProductModel, quantity: number , id : number, basketId : number }> = [];

    private basketCount = new Subject<number>();
    basketCount$ = this.basketCount.asObservable();
  
  
    updateBasketCount(count: number) {
      this.basketCount.next(count);
    }
  necesseryBasket : any = {};
loadBasketItems() {
    this.basketService.getBaskets(0, 10).subscribe((response: any) => {
      const userId = localStorage.getItem('userId');
      const basket = response.items.find((b: any) => b.userId === userId);
      if(basket.couponId)
        {
          this.couponService.getCouponByCouponId(basket.couponId).subscribe({
            next: (coupon) => {
              this.isCouponExist = coupon;
            }
          });
        }
      this.necesseryBasket = basket;
      if (basket) {
        this.basketItemService.getBasketitems(0, 100).subscribe((basitems: any) => {
        //   this.basketItems = basitems.items.map((item: any) => ({
        //     product: item.product, 
        //     quantity: item.quantity
        //   }));
            basitems.items.forEach((item: any) => {
                this.productService.getProducts(0, 100).subscribe((products: any) => {
                    const product = products.items.find((p: any) => p.id === item.productId);
                    this.basketItems.push({ product, quantity: item.quantity , id : item.id , basketId : item.basketId});
                });
            });
          

        });
      }
    });
  }
  incrementQuantity(item: any, index: number) {
    var basketItem = this.basketItems[index];
    let sendItem = new BasketitemModel()
    sendItem.quantity = basketItem.quantity + 1;
    sendItem.productId = basketItem.product.id.toString();
    sendItem.basketId = basketItem.basketId.toString();
    sendItem.id = basketItem.id;
    this.basketItems[index].quantity++;
    this.basketItemService.updateBasketitem(sendItem).subscribe(() => {

        console.log('Quantity incremented on the server');
    }, error => {
        console.error('Error updating quantity:', error);
    });
}

decrementQuantity(item: any, index: number) {
    if (this.basketItems[index].quantity > 1) {
        var basketItem = this.basketItems[index];
        let sendItem = new BasketitemModel()
        sendItem.quantity = basketItem.quantity - 1;
        sendItem.productId = basketItem.product.id.toString();
        sendItem.basketId = basketItem.basketId.toString();
        sendItem.id = basketItem.id;
        this.basketItems[index].quantity--;

        this.basketItemService.updateBasketitem(sendItem).subscribe(() => {
     
            this.basketService.updateBasketCount(this.basketItems.length);

            console.log('Quantity decremented on the server');
        }, error => {
            console.error('Error updating quantity:', error);
        });
    }
}

removeProduct(index: number) {
    const basketItemId = this.basketItems[index].id;
    this.basketItemService.deleteBasketitem(basketItemId).subscribe(() => {
        this.basketItems.splice(index, 1);
        this.basketService.updateBasketCount(this.basketItems.length);

        console.log('Product removed from the server');
    }, error => {
        console.error('Error deleting product:', error);
    });
}








    onSubmit() {
        // Ödeme işlemi için form submit işlemleri burada gerçekleştirilecek
    }

}
