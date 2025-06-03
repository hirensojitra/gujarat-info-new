import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

interface ShapeControl {
  id: string;
  title: string;
  active: boolean;
  icon: string;
}

@Component({
  selector: 'app-image-properties',
  templateUrl: './image-properties.component.html',
  styleUrls: ['./image-properties.component.scss'],
})
export class ImagePropertiesComponent implements OnInit {
  @Input() formGroupData!: AbstractControl;
  @Input() index: number;
  @Input() controlSet: ShapeControl[][];
  @Input() colorSet: string[];
  formData: FormGroup;
  constructor() {}
  ngOnInit(): void {
    this.formData = this.formGroupData as FormGroup;
    console.log(this.formGroupData);
    console.log(this.index);
    console.log(this.controlSet);
    console.log(this.colorSet);
  }
  getActiveControl(rectIndex: number, controlId: string): boolean {
    const controls = this.controlSet[rectIndex];
    return !!controls.find(
      (control) => control.id === controlId && control.active
    );
  }
  getColorClass(isActive: boolean): string {
    return isActive ? '' : 'shadow border border-light border-3';
  }
  updateColor(event: Event, control: any): void {
    const value = (event.target as HTMLInputElement).value;
    control.setValue(value);
  }
}
