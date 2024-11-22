import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './banners.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BannersComponent
  ],
  imports:  [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forChild([
      {path :"" ,component : BannersComponent}
    ])
  ]
})
export class BannersModule { }
