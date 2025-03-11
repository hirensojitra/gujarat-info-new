import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaptchaDirective } from '../directives/captcha.directive';
import { TogglePasswordDirective } from '../directives/toggle-password.directive';
import { AccordionActiveDirective } from '../directives/accordion-active.directive';
import { SelectDropdownDirective } from '../directives/select-dropdown.directive';
import { AsteriskDirective } from '../directives/asterisk.directive';
import { LocalitySelectorComponent } from '../controllers/locality-selector/locality-selector.component';
import { DraggableDirective } from '../directives/draggable.directive';  // Add this line
import { KeysPipe } from '../pipes/keys.pipe';
import { SvgProcessorDirective } from '../directives/svg-processor.directive';
import { ColorService } from '../services/color.service';
import { ColorPickerComponent } from '../controllers/color-picker/color-picker.component';
import { PaginationDirective } from '../directives/pagination.directive';
import { DependencyListPipe } from '../pipes/dependency-list.pipe';
import { SvgResponseDirective } from '../directives/svg-response.directive';
import { ScrollCenterDirective } from '../directives/scroll-center.directive';
import { DecimalDirective } from '../directives/decimal.directive';
import { ConfirmationModalComponent } from '../component/confirmation-modal/confirmation-modal.component';
import { RemSizeDirective } from '../directives/rem-size.directive';
import { FileSizePipe } from '../pipes/filesize.pipe';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    CaptchaDirective,
    TogglePasswordDirective,
    AccordionActiveDirective,
    SelectDropdownDirective,
    AsteriskDirective,
    DecimalDirective,
    LocalitySelectorComponent,
    DraggableDirective,
    KeysPipe,
    DependencyListPipe,
    SvgProcessorDirective,
    ColorPickerComponent,
    PaginationDirective,
    SvgResponseDirective,
    ScrollCenterDirective,
    ConfirmationModalComponent,
    RemSizeDirective,
    FileSizePipe
  ],
  exports: [
    CaptchaDirective,
    TogglePasswordDirective,
    AccordionActiveDirective,
    SelectDropdownDirective,
    AsteriskDirective,
    DecimalDirective,
    LocalitySelectorComponent,
    DraggableDirective,
    KeysPipe,
    DependencyListPipe,
    SvgProcessorDirective,
    ColorPickerComponent,
    PaginationDirective,
    SvgResponseDirective,
    ScrollCenterDirective,
    ConfirmationModalComponent,
    RemSizeDirective,
    FileSizePipe
  ],
  providers: [KeysPipe, ColorService, ColorPickerComponent, DependencyListPipe, RemSizeDirective]
})
export class SharedModule { }