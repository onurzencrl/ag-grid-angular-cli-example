import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CityComponent
  ],
  imports: [
    CommonModule,
    OnurTableModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: "", component: CityComponent }
    ]),
  ]
})
export class CityModule { }
