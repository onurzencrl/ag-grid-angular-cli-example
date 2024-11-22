import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketService } from 'src/app/admin/components/basket/basket.service';
import { BasketitemComponent } from 'src/app/admin/components/basketitem/basketitem.component';
import { BasketitemService } from 'src/app/admin/components/basketitem/basketitem.service';
import { Category, CategoryModel } from 'src/app/admin/components/category/category-model';
import { CategoryService } from 'src/app/admin/components/category/category.service';
import { AuthService } from 'src/app/admin/components/login/auth.service';
import { PassedsearchModel } from 'src/app/admin/components/passedsearch/passedsearch-model';
import { PassedsearchService } from 'src/app/admin/components/passedsearch/passedsearch.service';
import { ProductModel } from 'src/app/admin/components/products/product-model';
import { ProductService } from 'src/app/admin/components/products/product.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit , AfterViewInit , OnDestroy {
deleteSearched() {
  var userId = localStorage.getItem('userId');
  this._passedSearchService.deletePassedsearch(userId!.toString()).subscribe((response : any) => {
  });
}
  basketCount: number = 0;
  showUserMenu = false;
  isLoggedIn = false;
  userEmail: string = '';

  isSticky: boolean = false;
  
  checkScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Scroll event triggered, scrollTop:', scrollTop); // Konsolda görünüyor mu?

    if (scrollTop > 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  };
  logout() {
    this.authService.logout();
    window.location.reload();
  }
  constructor(private router :Router ,private authService: AuthService,private basketService: BasketService , private fb : FormBuilder ,private basketItemService: BasketitemService , private productService: ProductService , private _categoryService : CategoryService , private _passedSearchService : PassedsearchService , private el: ElementRef) { }
  contactProfileFormInit() {
    this.contactProfileInfoForm = this.fb.group({
      firstName: ['', ],
      lastName: ['', ],
      gender: [''],
      email: [''],
      phoneNumber: [''],
      dateBirth: [, ]
    });
  }
  
  contactProfileInfoForm!: FormGroup;

  isMobileMenuOpen: boolean = false;
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnDestroy() {
    // Scroll olayını dinlemeyi durduralım
    window.removeEventListener('scroll', this.onScroll);
  }

  isFocused: boolean = false;
  searchQuery: string = '';
  searchResults: any[] = [];

  onInputFocus() {
    this._passedSearchService.getPassedsearches(0, 10).subscribe((response : any) => {
    this.recentSearches = Array.from(new Set(response.items.map((item: any) => item.searchText)));
    this.popularSearches = Array.from(new Set(response.items.map((item: any) => item.searchText))).slice(0, 5);

      this.recentClicked = response.items 

    });
      this.isFocused = true;
  }

  @ViewChild('blog') blogSection!: ElementRef;
  @ViewChild('cta-container"') ctaContainerSection!: ElementRef;

  // Kaydırma fonksiyonu
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onInputBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 200); // Kısa bir gecikme, tıklama etkinliğini yakalamak için
  }


  fetchSearchResults(query: string) {
    // Arama sonuçlarını simüle et (API çağrısı ile değiştirilebilir)
    this.searchResults = [
      { name: 'Ürün 1', category: 'Kategori 1', imageUrl: 'path_to_image_1' },
      // Diğer ürünler
    ];
  }


  showSearchResults = false;
  recentSearches = [];
  popularSearches : any = [];
  recentClicked = [];


  hideSearchResults() {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200); // Blur'dan hemen sonra kapanmasını önlemek için timeout
  }


  mockSearchResults(searchTerm: string) {
    // Simüle edilmiş arama sonuçları
    return [
      { name: 'Ürün 1', category: 'Kategori A', imageUrl: '...' },
      { name: 'Ürün 2', category: 'Kategori B', imageUrl: '...' },
    ];
  }

  onScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Scroll event triggered, scrollTop:', scrollTop); // Bu kısım tetikleniyor mu?

    if (scrollTop > 50) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  };


  history: string[] = []; // Search history

  selectedIndex: number = -1;
  selectSearchTerm(term: string) {
    // Handle term selection from popular searches
    console.log('Selected search term: ', term);
  }

  selectHistoryItem(item: string) {
    // Handle history item selection
    console.log('Selected history item: ', item);
  }

  clearHistory() {
    this.history = [];
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
    this.contactProfileFormInit()
    var userId = localStorage.getItem('userId');
    if (userId) {
      this.isLoggedIn = true;
    }
    else
    {
      this.isLoggedIn = false;
    }
    this.getCategorys();
    this.loadBasketItems();
    this.basketService.basketCount$.subscribe(count => {
      this.basketCount = count;
    });
  }
  basketItems: Array<{ product: ProductModel, quantity: number , id : number, basketId : number }> = [];
  showExpandedPanel: boolean = false; // Genişletilmiş arama panelini göstermek için
  onSearch(event: any): void {
    const query = event.target.value;
    this.searchQuery = query;
    if(query.length === 0)
    {
      this.isFocused = true 

    }
    else
    {
      this.isFocused = false
    }
    this.showExpandedPanel = false 
    // Eğer inputa tıklandığında genişletilmiş paneli göstermek istersen
    if (query.length === 0) {
      this.showExpandedPanel = true; // Paneli göster
    } else if (query.length > 2) {
      this.productService.filterProducts(0, 10, 'name', 'asc', 'name', 'contains', query)
        .subscribe(
          (results: any) => {
            this.searchResults = results.items;  // API'dan gelen response yapısına göre ayarlayın
            this.showSearchResults = true;
            this.showExpandedPanel = false; // Paneli kapat, arama sonuçlarını göster
          },
          error => {
            console.error('Error fetching search results:', error);
          }
        );
    } else {
      this.searchResults = [];
      this.showSearchResults = false;
      this.showExpandedPanel = true; // Arama terimi kısa olduğunda genişletilmiş paneli tekrar göster
    }
  }
  

  selectProduct(product: any): void {
    var passedSearch : PassedsearchModel  = new PassedsearchModel();
    passedSearch.name = product.name;
    passedSearch.searchText = product.name;
    passedSearch.userId = localStorage.getItem('userId') || '';
    passedSearch.productId = product.id.toString();

    this._passedSearchService.createPassedsearch(passedSearch).subscribe((response : any) => {
   
   
      console.log('Selected product:', product);
    this.router.navigate(['/product/detail', product.id]);

})
  }

isDropdownVisible: boolean = false;

toggleDropdown(state: boolean) {
  this.isDropdownVisible = state;
}



fetchResults(term: string) {
  // Mock data ile öneriler getirilecek
}
onKeyDown(event: KeyboardEvent) {
  // Navigate through search results with the arrow keys
  if (event.key === 'ArrowDown') {
    this.selectedIndex =
      (this.selectedIndex + 1) % this.searchResults.length; // Cycle down
  } else if (event.key === 'ArrowUp') {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.searchResults.length) %
      this.searchResults.length; // Cycle up
  } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
    // Navigate to the selected product detail page
    this.selectProduct(this.searchResults[this.selectedIndex]);
  }
}

  loadBasketItems() {
    this.basketService.getBaskets(0, 10).subscribe((response: any) => {
      const userId = localStorage.getItem('userId');
      const basket = response.items.find((b: any) => b.userId === userId);
  
      if (basket) {
        this.basketItemService.getBasketitems(0, 100).subscribe((basitems: any) => {
        //   this.basketItems = basitems.items.map((item: any) => ({
        //     product: item.product, 
        //     quantity: item.quantity
        //   }));
            basitems.items.forEach((item: any) => {
                this.productService.getProducts(0, 100).subscribe((products: any) => {
                    const product = products.items.find((p: any) => p.id === item.productId);
                    this.basketCount = products.items.length;
                    this.basketItems.push({ product, quantity: item.quantity , id : item.id , basketId : item.basketId});
                });
            });
          

        });
      }
    });
  }


  ngAfterViewInit() {
    const mobileMenuOpenBtns = this.el.nativeElement.querySelectorAll('[data-mobile-menu-open-btn]');
    const mobileMenus = this.el.nativeElement.querySelectorAll('[data-mobile-menu]');
    const mobileMenuCloseBtns = this.el.nativeElement.querySelectorAll('[data-mobile-menu-close-btn]');
    const overlay = this.el.nativeElement.querySelector('[data-overlay]');

    for (let i = 0; i < mobileMenuOpenBtns.length; i++) {

      // mobile menu close function
      const mobileMenuCloseFunc = () => {
        mobileMenus[i].classList.remove('active');
        overlay.classList.remove('active');
      };

      mobileMenuOpenBtns[i].addEventListener('click', () => {
        mobileMenus[i].classList.add('active');
        overlay.classList.add('active');
      });

      mobileMenuCloseBtns[i].addEventListener('click', mobileMenuCloseFunc);
      overlay.addEventListener('click', mobileMenuCloseFunc);
    }
  }

  categoryList: CategoryModel[] = [];
  parentCategories: CategoryModel[] = [];
  childCategories: { [key: number]: CategoryModel[] } = {};

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }
  toggleAccordion(event: any): void {
    const accordionBtn = event.currentTarget.closest('.accordion-menu');
    
    if (!accordionBtn) {
        console.error('Accordion button not found');
        return;
    }

    const accordionList = accordionBtn.nextElementSibling;

    if (!accordionList) {
        console.error('Accordion list not found');
        return;
    }

    // Toggle active state on clicked button and its associated accordion list
    accordionList.classList.toggle('active');
    accordionBtn.classList.toggle('active');

    // Close all other accordion lists
    const allAccordions = document.querySelectorAll('.submenu-category-list');
    const allAccordionButtons = document.querySelectorAll('.accordion-menu');

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

  getCategorys() {
    this._categoryService.getCategorys(0, 10).subscribe((data: Category) => {
      this.categoryList = data.items;
  
      // Filter for parent categories (those with parentCategoryId = 0)
      this.parentCategories = this.categoryList.filter(cat => cat.parentCategoryId === null);
  
      // Group child categories by their parentCategoryId
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
  
  

}
