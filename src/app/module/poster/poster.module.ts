import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PosterRoutingModule } from './poster-routing.module';
import { PosterComponent } from './poster.component';
import { SharedModule } from '../../common/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule }    from '@angular/material/icon';
import { MatButtonModule }  from '@angular/material/button';
import { MatCardModule }    from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }     from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule }     from '@angular/material/select';

@NgModule({
  declarations: [
    PosterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PosterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  exports: [
    PosterComponent
  ]
})
export class PosterModule { }
