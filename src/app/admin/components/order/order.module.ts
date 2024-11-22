import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OnurTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path :"" ,component : OrderComponent}
    ])
  ]
})
export class OrderModule { }
