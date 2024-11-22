import { Component, OnInit } from '@angular/core';
import { Product, ProductModel } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';
import { TagSpecificType } from '../category/category-model';
import { CategoryService } from 'src/app/admin/components/category/category.service';
import { Category, CategoryModel } from 'src/app/admin/components/category/category-model';
import { TestimonialService } from 'src/app/admin/components/testimonial/testimonial.service';
import { Testimonial } from 'src/app/admin/components/testimonial/testimonial-model';
import { FilterService } from 'src/app/admin/components/filter/filter.service';
import { Filter } from 'src/app/admin/components/filter/filter-model';
import { FilterModel } from '@ag-grid-community/core';
import { BasketService } from 'src/app/admin/components/basket/basket.service';
import { BasketitemService } from 'src/app/admin/components/basketitem/basketitem.service';
import { BasketitemModel } from 'src/app/admin/components/basketitem/basketitem-model';
import { Basket, BasketModel } from 'src/app/admin/components/basket/basket-model';
import { Subject } from 'rxjs';
import { FavproductService } from 'src/app/admin/components/favproduct/favproduct.service';
import { FavitemService } from 'src/app/admin/components/favitem/favitem.service';
import { FavitemModel } from 'src/app/admin/components/favitem/favitem-model';
import { Favproduct, FavproductModel } from 'src/app/admin/components/favproduct/favproduct-model';

@Component({
  selector: 'app-arrivals-trending-toprated',
  templateUrl: './arrivals-trending-toprated.component.html',
  styleUrls: ['./arrivals-trending-toprated.component.scss']
})
export class ArrivalsTrendingTopratedComponent implements OnInit {
  TagSpecificType = TagSpecificType;
  productList: any[] = [];
  dealOftheDayList: any[] = [];
  bestSellerList: any[] = [];
  newArrivalsList: any[] = [];
  trendingList: any[] = [];
  topRatedList: any[] = []; 
   productListLastFive: any[] = [];
  bestSellerListLastFive: any[] = [];
  newArrivalsListLastFive: any[] = [];
  trendingListLastFive: any[] = [];
  topRatedListLastFive: any[] = [];

  constructor( private readonly _service : ProductService ,private readonly testimonialService : TestimonialService , private readonly basketService : BasketService  , private readonly favProductService : FavproductService ,  private readonly favItemService : FavitemService ,  private readonly basketItemService : BasketitemService ,  private readonly _categoryService : CategoryService ,  private readonly _filterService : FilterService) { }

  ngOnInit(): void {
    this.startCountdown();
  this.getProducts();
  this.getCategorys();
  this.getFilters();
  }

  whenClickedCategory(categoryId: string) {
    this.activeFilters = []; // Reset active filters
   this.productList = this.productList.filter((product: any) => product.categoryId === categoryId);
  }

  getProducts(){
    this._service.getProducts(0, 10).subscribe((data: Product) => {
      // this.products = data;
      this.productList = data.items
      this.bestSellerList = data.items.filter(item => item.tagId === 'bc7dfd91-6e72-4403-1d53-08dcbbae1220').slice(0, 5);
      this.dealOftheDayList = data.items.filter(item => item.dealOfTheDay === true).slice(0, 5);
      this.newArrivalsList = data.items.filter(item => item.tagId=== 'b97ab2bc-69d3-48db-1d54-08dcbbae1220').slice(0, 5);
      this.trendingList = data.items.filter(item => item.tagId=== 'bc7dfd91-6e72-4403-1d53-08dcbbae1220').slice(0, 5);
      this.topRatedList = data.items.filter(item => item.tagId=== '3d8dc34a-956b-4d93-0bba-08dcbc86b834').slice(0, 5);
      this.productListLastFive = data.items
      this.bestSellerListLastFive = data.items.filter(item => item.tagId=== 'bc7dfd91-6e72-4403-1d53-08dcbbae1220').slice(-5);
      this.newArrivalsListLastFive = data.items.filter(item => item.tagId === 'b97ab2bc-69d3-48db-1d54-08dcbbae1220').slice(-5);
      this.trendingListLastFive = data.items.filter(item => item.tagId=== 'bc7dfd91-6e72-4403-1d53-08dcbbae1220').slice(-5);
      this.topRatedListLastFive = data.items.filter(item => item.tagId === '3d8dc34a-956b-4d93-0bba-08dcbc86b834').slice(-5);

      
    });
  
  }

  categoryList: CategoryModel[] = [];
  parentCategories: CategoryModel[] = [];
  childCategories: { [key: number]: CategoryModel[] } = {}; 
  
  filterList: FilterModel[] = [];
  parentFilters: FilterModel[] = [];
  childFilters: { [key: number]: FilterModel[] } = {};
  
  getCategorys(){
    this._categoryService.getCategorys(0, 10).subscribe((data: Category) => {
      this.categoryList = data.items;
      this.parentCategories = this.categoryList.filter(cat => cat.parentCategoryId === null);
      this.childCategories = this.categoryList
        .filter(cat => cat.parentCategoryId !== 0)
        .reduce((acc: { [key: number]: CategoryModel[] }, cat) => {
          if (!acc[cat.parentCategoryId]) {
            acc[cat.parentCategoryId] = [];
          }
          acc[cat.parentCategoryId].push(cat);
          return acc;
        }, {});
    });
  }

  getFilters(){
    this._filterService.getFilters(0, 10).subscribe((data: FilterModel) => {
      this.filterList = data.items;
      this.parentFilters = this.filterList.filter(cat => cat.parentFilterId == null);
      this.childFilters = this.filterList
        .filter((cat : any) => cat.parentFilterId !== 0)
        .reduce((acc: { [key: number]: FilterModel[] }, cat) => {
          if (!acc[cat.parentFilterId]) {
            acc[cat.parentFilterId] = [];
          }
          acc[cat.parentFilterId].push(cat);
          return acc;
        }, {});
    });
  }
  
  testimonials: Testimonial[] = [];
  getTestimonails(){
    this.testimonialService.getTestimonials(0, 10).subscribe((data: any) => {
      this.testimonials = data.items;
    });
  }
  

  toggleAccordion(event: any , filterType: string): void {
    // this.accordionStatus[filterType] = !this.accordionStatus[filterType];

    // Ensure the button clicked is the accordion toggle button
    const accordionBtn = event.currentTarget.closest('.sidebar-accordion-menu');
    
    if (!accordionBtn) {
        console.error('Accordion button not found');
        return;
    }

    // Find the next element sibling that should be the accordion list
    const accordionList = accordionBtn.nextElementSibling;

    if (!accordionList) {
        console.error('Accordion list not found');
        return;
    }

    // Toggle active state on clicked button and its associated accordion list
    accordionList.classList.toggle('active');
    accordionBtn.classList.toggle('active');

    // Close all other accordion lists
    const allAccordions = document.querySelectorAll('.sidebar-submenu-category-list');
    const allAccordionButtons = document.querySelectorAll('.sidebar-accordion-menu');

    allAccordions.forEach((accordion: any) => {
        if (accordion !== accordionList) {
            accordion.classList.remove('active');
        }
    });

    allAccordionButtons.forEach((btn: any) => {
        if (btn !== accordionBtn) {
            btn.classList.remove('active');
        }
    });
}

  accordionStatus : any = {
    color: false,
    size: false,
    brand: false,
  };

  hours: number = 7;
  minutes: number = 0;
  seconds: number = 0;

  private countdownInterval: any;

  sortProducts(event: Event) {
    const target = event.target as HTMLSelectElement; // Casting to HTMLSelectElement
    const selectedValue = target.value;
  
    console.log('Selected Value:', selectedValue);
  
    switch (selectedValue) {
      case 'recommended':
        this.sortByRecommended();
        break;
      case 'lowestPrice':
        this.sortByLowestPrice();
        break;
      case 'highestPrice':
        this.sortByHighestPrice();
        break;
      case 'bestSeller':
        this.sortByBestSeller();
        break;
      case 'mostFavorites':
        this.sortByMostFavorites();
        break;
      case 'newest':
        this.sortByNewest();
        break;
      case 'mostReviewed':
        this.sortByMostReviewed();
        break;
      default:
        this.productList = this.getOriginalProductList(); // Reset to original order if no match
        break;
    }
  }
  
  // Sorting logic for different categories:
  
  sortByRecommended() {
    // Implement your custom "recommended" logic
    console.log('Sorting by recommended');
    this.productList = this.productList;  // Assuming recommended is the default order
  }
  
  sortByLowestPrice() {
    console.log('Sorting by lowest price');
    this.productList.sort((a, b) => a.price - b.price);
  }
  
  sortByHighestPrice() {
    console.log('Sorting by highest price');
    this.productList.sort((a, b) => b.price - a.price);
  }
  
  sortByBestSeller() {
    console.log('Sorting by best sellers');
    this.productList.sort((a, b) => b.salesCount - a.salesCount);
  }
  
  sortByMostFavorites() {
    console.log('Sorting by most favorites');
    this.productList.sort((a, b) => b.favoritesCount - a.favoritesCount);
  }
  
  sortByNewest() {
    console.log('Sorting by newest products');
    this.productList.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }
  
  sortByMostReviewed() {
    console.log('Sorting by most reviewed');
    this.productList.sort((a, b) => b.reviewCount - a.reviewCount);
  }
  
  // Function to return the original product list (could be fetched again)
  getOriginalProductList() {
    // Fetch or restore the original product list
    return [...this.productList];
  }
  
  startCountdown() {
    const totalSeconds = this.hours * 3600 + this.minutes * 60 + this.seconds;

    this.countdownInterval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else if (this.minutes > 0) {
        this.minutes--;
        this.seconds = 59;
      } else if (this.hours > 0) {
        this.hours--;
        this.minutes = 59;
        this.seconds = 59;
      } else {
        clearInterval(this.countdownInterval); // Geri sayım bittiğinde durdur
      }
    }, 1000); // Her saniye güncellenir
  }


  private basketCount = new Subject<number>();
  basketCount$ = this.basketCount.asObservable();


  updateBasketCount(count: number) {
    this.basketCount.next(count);
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
  
  minPrice: number | null = null; // Default value for minimum price
  maxPrice: number | null = null; // Default value for maximum price
  selectedFilters: any[] = [];
  activeFilters: any[] = []; // activeFilters özelliğini tanımla ve bir dizi olarak başlat.

filterProducts(type: string, value: string, e: any) {

  // If filtering by color (Renk)
  if(type === 'Renk') {
    if (e.currentTarget.checked) {
      // Add new filter
      const newFilter = {
        field: type.toLowerCase(),
        operator: 'eq',
        value: value
      };
  
      // Add filter to active filters
      this.activeFilters.push(newFilter);
    } else {
      // Remove filter
      this.activeFilters = this.activeFilters.filter(f => !(f.field === type.toLowerCase() && f.value === value));
    }
  }

  if (type === 'price') {
 
  // Handle minPrice and maxPrice filtering
  if (this.minPrice !== null || this.maxPrice !== null) {
    // Remove existing 'gt' and 'lt' filters for price range
    this.activeFilters = this.activeFilters.filter(f => f.field !== 'price' || (f.operator !== 'gt' && f.operator !== 'lt'));
  
    // Add new 'gt' filter for minimum price
    this.activeFilters.push({
      field: 'price',
      operator: 'gt',
      value: this.minPrice == null ? -1 : this.minPrice
    });
  
    // Add new 'lt' filter for maximum price
    this.activeFilters.push({
      field: 'price',
      operator: 'lt',
      value: this.maxPrice == null ? 1000 : this.maxPrice
    });
  }

}
  // Fetch products with updated filters
  this._service.multiFilterProducts(0, 10, 'name', 'asc', this.activeFilters)
    .subscribe(
      (response: any) => {
        this.productList = response.items; // No need to filter again, backend handles it.
        console.log('Filtered products:', response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
}

  
  
//   applyFilters() {
//     // Construct the filter object for the request
//     const filters = this.selectedFilters.map(filter => ({
//         field: filter.field,
//         operator: filter.operator,
//         value: filter.value,
//         logic: 'or'  // Adjust logic as needed (e.g., 'and' or 'or')
//     }));

//     const body = {
//         sort: [
//             {
//                 field: 'name',  // Sort by name
//                 dir: 'asc'
//             }
//         ],
//         filter: {
//             logic: 'and', // Adjust logic as needed for combining filters
//             filters: filters
//         }
//     };

//     // Send the dynamic request to the backend
//     this._service.multiFilterProducts(0, 10, body)
//         .subscribe(
//             (response: any) => {
//                 this.productList = response.items;
//                 console.log('Filtered products:', response);
//             },
//             (error) => {
//                 console.error('Error fetching products:', error);
//             }
//         );
// }


  closeSidebar() {
    // Logic to close the sidebar
  }
  

}
