import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsettingComponent } from './contactsetting.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContactsettingComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: ContactsettingComponent}
    ])
  ]
})
export class ContactsettingModule { }
