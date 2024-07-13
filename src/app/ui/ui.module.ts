import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports : [HomeComponent, HomePageComponent]
})
export class UiModule { }
