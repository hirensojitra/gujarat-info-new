import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizePanelComponent } from './resize-panel.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    ResizePanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule,
    MatChipsModule
  ],
  exports: [
    ResizePanelComponent
  ]
})
export class ResizePanelModule { }
