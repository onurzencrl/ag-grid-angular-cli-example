import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusComponent } from './menus.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { Menu } from '../../layout/components/menu-model';



@NgModule({
  declarations: [
    MenusComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    RouterModule.forChild([
      {path :"" ,component : MenusComponent}
    ])

  ]
})
export class MenusModule { }
