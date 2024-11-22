import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavproductComponent } from './favproduct.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FavproductComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: FavproductComponent}
    ])
  ]
})
export class FavproductModule { }
