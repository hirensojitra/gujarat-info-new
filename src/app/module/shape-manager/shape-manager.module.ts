// src/app/shape-manager/shape-manager.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { UploadShapeComponent } from './upload-shape/upload-shape.component';
import { ShapeListComponent } from './shape-list/shape-list.component';
import { DrawSvgDirective } from './draw-svg.directive';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
  { path: '', component: ShapeListComponent },
  { path: 'upload', component: UploadShapeComponent },
];

@NgModule({
  declarations: [UploadShapeComponent, ShapeListComponent, DrawSvgDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule
  ],
  exports: [RouterModule],
})
export class ShapeManagerModule {}
