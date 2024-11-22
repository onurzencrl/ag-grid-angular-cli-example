import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictComponent } from './district.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    DistrictComponent
  ],
  imports: [
    CommonModule,
    OnurTableModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: "", component: DistrictComponent }
    ]),
  ]
})
export class DistrictModule { }
