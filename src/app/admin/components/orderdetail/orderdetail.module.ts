import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderdetailComponent } from './orderdetail.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderdetailComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: OrderdetailComponent}
    ])
  ]
})
export class OrderdetailModule { }