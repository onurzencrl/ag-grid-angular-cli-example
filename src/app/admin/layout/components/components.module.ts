import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NavbarComponent,
    ContentComponent  
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
    
  ],
  exports: [HeaderComponent, SidebarComponent , ContentComponent]
})
export class ComponentsModule { }
