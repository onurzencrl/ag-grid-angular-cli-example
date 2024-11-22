import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriberComponent } from './subscriber.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SubscriberComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: SubscriberComponent}
    ])
  ]
})
export class SubscriberModule { }
