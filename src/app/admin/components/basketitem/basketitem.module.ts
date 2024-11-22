import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketitemComponent } from './basketitem.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BasketitemComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: BasketitemComponent}
    ])
  ]
})
export class BasketitemModule { }
