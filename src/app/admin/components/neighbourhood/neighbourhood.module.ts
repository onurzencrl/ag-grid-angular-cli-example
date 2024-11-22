import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeighbourhoodComponent } from './neighbourhood.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NeighbourhoodComponent
  ],
  imports: [
    CommonModule
    ,OnurTableModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: "", component: NeighbourhoodComponent }
    ]),

  ]
})
export class NeighbourhoodModule { }
