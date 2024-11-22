import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTagComponent } from './product-tag.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductTagComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path :"" ,component : ProductTagComponent}
    ])
  ]
})
export class ProductTagModule { }
