import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassedsearchComponent } from './passedsearch.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PassedsearchComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: PassedsearchComponent}
    ])
  ]
})
export class PassedsearchModule { }
