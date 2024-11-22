import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductimageComponent } from './productimage.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    ProductimageComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    RouterModule.forChild([
      {path : "", component: ProductimageComponent}
    ])
  ]
})
export class ProductimageModule { }
