import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../login/auth.interceptor';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgGridAngular,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {path :"" ,component : ProductsComponent}
    ])
  ],
  exports : [ProductsComponent],
  bootstrap: [ProductsComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class ProductsModule { }
