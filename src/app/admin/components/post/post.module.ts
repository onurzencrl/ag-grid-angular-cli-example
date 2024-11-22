import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { OnurTableModule } from 'src/app/onur-table/onur-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    OnurTableModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      {path : "", component: PostComponent}
    ])
  ]
})
export class PostModule { }
