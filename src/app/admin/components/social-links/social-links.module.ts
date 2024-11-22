import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SocialLinksComponent
  ],
  imports: [
    CommonModule,
    OnurTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path :"" ,component : SocialLinksComponent}
    ])
  ]
})
export class SocialLinksModule { }
