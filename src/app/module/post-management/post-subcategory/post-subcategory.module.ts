import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostSubcategoryRoutingModule } from './post-subcategory-routing.module';
import { PostSubcategoryComponent } from './post-subcategory.component';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostSubcategoryComponent
  ],
  imports: [
      CommonModule,
      PostSubcategoryRoutingModule,
      SharedModule,
      ReactiveFormsModule,
      FormsModule
    ]
})
export class PostSubcategoryModule { }
