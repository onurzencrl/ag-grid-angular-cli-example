import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel, Product, ProductModel } from './product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:60805/api/'; // API URL buraya göre ayarlanmalı

  constructor(private http: HttpClient) { }

  getProducts(pageIndex: number, pageSize: number): Observable<Product> {
    let params = new HttpParams();
    params = params.append('PageIndex', pageIndex.toString());
    params = params.append('PageSize', pageSize.toString());

    return this.http.get<Product>(this.apiUrl+'Products', { params });
  }

  createProduct(category: ProductModel): Observable<ProductModel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ProductModel>(this.apiUrl+'Products', category, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiUrl+'Products/' + id);
  }
  filterProducts(pageIndex: number, pageSize: number, sortField: string, sortDir: string, filterField: string, filterOperator: string, filterValue: string) {
    const url = `http://localhost:60805/api/Products/GetList/ByDynamic`;

    // Construct the query parameters
    const params = new HttpParams()
        .set('PageIndex', pageIndex.toString())
        .set('PageSize', pageSize.toString());

    // Construct the request body
    const body = {
        sort: [
            {
                field: sortField,
                dir: sortDir
            }
        ],
        filter: {
            field: filterField,
            operator: filterOperator,
            value: filterValue,
            logic: 'and',  // Adjust this if needed
            // filters: []
        }
    };

    // Make the HTTP POST request
    return this.http.post(url, body, { params });
}
 
multiFilterProducts(pageIndex: number, pageSize: number, sortField: string, sortDir: string, filters: FilterModel[]) {
  const url = `http://localhost:60805/api/Products/GetList/ByDynamic`;

  const params = new HttpParams()
    .set('PageIndex', pageIndex.toString())
    .set('PageSize', pageSize.toString());

  let priceFilter: FilterModel[] | undefined = [];
  let otherFilters: FilterModel[] = [];

  // Price filtresini ve diğer filtreleri ayır
  filters.forEach((filter) => {
    if (filter.field === 'price') {
      filter.value = filter.value.toString();
      priceFilter?.push(filter);
    } else {
      otherFilters.push(filter);
    }
  });

  let body: any;

  if (priceFilter.length > 0) {


    body = {
      sort: [
        {
          field: sortField,
          dir: sortDir
        }
      ],
      filter: {
        field: priceFilter[0].field,
        operator: priceFilter[0].operator,
        value: priceFilter[0].value.toString(),
        logic: 'and',
        filters: [priceFilter[1], ...otherFilters]
      }
    };
  } else {
    body = {
      sort: [
        {
          field: sortField,
          dir: sortDir
        }
      ],
      filter: otherFilters.length > 0 ? {
        field: otherFilters[0].field,
        operator: otherFilters[0].operator,
        value: otherFilters[0].value,
        logic: 'or',
        filters: otherFilters.slice(1) // İlk filtreden sonrası burada
      } : undefined
    };
  }

  // HTTP POST isteği
  return this.http.post<any>(url, body, { params });
}



  // let priceFilter: FilterModel[] | undefined = [];
  // let otherFilters: FilterModel[] = [];

  // // Fiyat filtresi var mı kontrol et
  // filters.forEach((filter) => {
  //   if (filter.field === 'price') {
  //     priceFilter?.push(filter);
  //   } else {
  //     otherFilters.push({
  //       ...filter
  //     });
  //   }
  // });

  // let filterModel: FilterModel | undefined;

  // if (priceFilter) {
  //   // Eğer fiyat filtresi varsa, fiyatı üst seviyede yerleştir
  //   filterModel = {
  //     field: 'price',
  //     operator: priceFilter![0].operator,
  //     value: priceFilter![0].value,
  //     logic: 'and',
  //     filters: [priceFilter![1], ...otherFilters]
  //   };
  // } else if (otherFilters.length > 0) {
  //   // Fiyat filtresi yoksa diğer filtreleri üst seviyede yerleştir
  //   filterModel = {
  //     field: otherFilters[0].field,
  //     operator: otherFilters[0].operator,
  //     value: otherFilters[0].value,
  //     logic: 'or',
  //     filters: otherFilters.slice(1).map((filter) => ({
  //       ...filter,
  //       logic: 'and' // Her alt filtreye 'and' logic ekle
  //     }))
  //   };
  // }

  // // İstek için dinamik filtre yapısını hazırla
  // const body = {
  //   sort: [
  //     {
  //       field: sortField,
  //       dir: sortDir
  //     }
  //   ],
  //   filter: filterModel
  // };

  // // HTTP POST isteğini yap
  // return this.http.post(url, body, { params });

  getProductById(productId: string): Observable<any> {
    const url = `${this.apiUrl+'Products'}/${productId}`;
    return this.http.get<any>(url);
  }


  updateCategory(category: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.apiUrl+'Products', category, { headers });
  }
}
