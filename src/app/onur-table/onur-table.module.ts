import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnurTableComponent } from './onur-table.component';
import { RichGridComponent } from './components/rich-grid-example/rich-grid.component';
import { DateComponent } from './components/date-component/date.component';
import { SortableHeaderComponent } from './components/header-component/sortable-header.component';
import { HeaderGroupComponent } from './components/header-group-component/header-group.component';
import { RendererComponent } from './components/renderer-component/renderer.component';
import { ProficiencyFilter } from './components/filters/proficiency.component.filter';
import { SkillFilter } from './components/filters/skill.component.filter';
import { AgGridAngular } from '@ag-grid-community/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GenderRenderer } from './components/gender-renderer/genderrenderer.component';



@NgModule({
  declarations: [
    RichGridComponent,
    DateComponent,
    SortableHeaderComponent,
    HeaderGroupComponent,
    RendererComponent,
    GenderRenderer,
    ProficiencyFilter,
    SkillFilter
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridAngular
  ],
  exports : [  RichGridComponent,
    DateComponent,
    SortableHeaderComponent,
    HeaderGroupComponent,
    RendererComponent,
    ProficiencyFilter,
    SkillFilter]
})
export class OnurTableModule { }
