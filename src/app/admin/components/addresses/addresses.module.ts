import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesComponent } from './addresses.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddressesComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: AddressesComponent}
    ])
  ]
})
export class AddressesModule { }
