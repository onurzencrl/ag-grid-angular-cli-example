import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CampaignComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : "", component: CampaignComponent}
    ])
  ]
})
export class CampaignModule { }
