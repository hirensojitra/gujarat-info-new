import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PostGenerateRoutingModule } from './post-generate-routing.module';
import { PostGenerateComponent } from './post-generate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TextPropertiesComponent } from './text-properties/text-properties.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule }    from '@angular/material/slider';
import { ImagePropertiesComponent } from './image-properties/image-properties.component';

@NgModule({
  declarations: [PostGenerateComponent, TextPropertiesComponent, ImagePropertiesComponent],
  imports: [
    CommonModule,
    PostGenerateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DragDropModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSliderModule
  ],
  exports: [TextPropertiesComponent, ImagePropertiesComponent],
})
export class PostGenerateModule {}
