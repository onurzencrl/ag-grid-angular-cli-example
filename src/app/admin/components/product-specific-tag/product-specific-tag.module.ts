import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSpecificTagComponent } from './product-specific-tag.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductSpecificTagComponent
  ],
  imports: [
    CommonModule,
    OnurTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path :"" ,component : ProductSpecificTagComponent}
    ])
  ]
})
export class ProductSpecificTagModule { }
