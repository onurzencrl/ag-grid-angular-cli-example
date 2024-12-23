import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OnurTableModule,
    RouterModule.forChild([
        { path: "", component: CustomerComponent }
    ]),
],
  exports: [CustomerComponent]
})
export class CustomerModule { }
