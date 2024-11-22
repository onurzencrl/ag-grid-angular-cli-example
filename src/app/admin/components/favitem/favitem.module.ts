import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavitemComponent } from './favitem.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FavitemComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: FavitemComponent}
    ])
  ]
})
export class FavitemModule { }
