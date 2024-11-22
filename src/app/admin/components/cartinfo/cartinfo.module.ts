import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartinfoComponent } from './cartinfo.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartinfoComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: CartinfoComponent}
    ])
  ]
})
export class CartinfoModule { }
