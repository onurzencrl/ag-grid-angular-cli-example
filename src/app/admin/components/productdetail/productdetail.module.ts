import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductdetailComponent } from './productdetail.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ProductdetailComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {path : "", component: ProductdetailComponent}
    ])
  ]
})
export class ProductdetailModule { }
