import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: FilterComponent}
    ])
  ]
})
export class FilterModule { }
