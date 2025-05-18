import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostCategoryRoutingModule } from './post-category-routing.module';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { PostCategoryComponent } from './post-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostCategoryComponent],
  imports: [
    CommonModule,
    PostCategoryRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostCategoryModule {}
