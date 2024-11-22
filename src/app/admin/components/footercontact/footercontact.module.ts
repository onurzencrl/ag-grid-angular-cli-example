import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootercontactComponent } from './footercontact.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FootercontactComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: FootercontactComponent}
    ])
  ]
})
export class FootercontactModule { }
