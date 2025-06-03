import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Subscription, firstValueFrom } from 'rxjs';
import { FontService } from 'src/app/common/services/fonts.service';

interface ShapeControl {
  id: string;
  title: string;
  active: boolean;
  icon: string;
}

@Component({
  selector: 'app-text-properties',
  templateUrl: './text-properties.component.html',
})
export class TextPropertiesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formGroupData!: AbstractControl;
  @Input() index!: number;
  @Input() controlSet!: ShapeControl[][];
  @Input() colorSet: string[];
  @Input() selectData: {
    [key: string]: {
      title: string;
      control: FormControl;
      api: string;
      dependency: string;
      lang: string;
    };
  } = {};
  @Output() apiDataChange = new EventEmitter<{ [key: string]: any[] }>();
  apiData: { [key: string]: any[] } = {};
  fontFamilies: { family: string; variables: string[]; names: string[] }[] = [];
  formData:FormGroup;
  private _subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private fontService: FontService) {
    this.fontFamilies = this.fontService.fontFamilies;
  }

  ngOnInit(): void {
    this.formData = this.formGroupData as FormGroup;
    this.initializeData();
    this.setupFontFamilySubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroupData'] && !changes['formGroupData'].isFirstChange()) {
      this.teardownSubscriptions();
      this.setupFontFamilySubscription();
    }
  }

  ngOnDestroy(): void {
    this.teardownSubscriptions();
  }

  getActiveControl(rectIndex: number, controlId: string): boolean {
    const controls = this.controlSet[rectIndex];
    return !!controls.find(control => control.id === controlId && control.active);
  }

  getWeight(c: AbstractControl): string[] {
    const selectedFontFamily = c.value;
    const f = this.fontFamilies.find(family => family.family === selectedFontFamily);
    return f ? f.variables : [];
  }

  async syncData(control: AbstractControl | null) {
    if (!(control instanceof FormGroup)) {
      console.error('Invalid form group');
      return;
    }

    const dependency = control.get('dependency')?.value;
    const cn = control.get('controlName')?.value;
    let api = control.get('api')?.value;

    if (cn && api) {
      api = api.endsWith('/') ? api : `${api}/`;
      if (dependency && dependency !== 'none') {
        const dependencyValue = this.selectData[dependency]?.control?.value;
        if (dependencyValue) {
          api += dependencyValue;
        }
      }

      await this.loadData(cn, api);
    }
  }

  async fetchDataFromAPI(apiUrl: string, controlName: string): Promise<void> {
    try {
      const data = await firstValueFrom(this.http.get<any[]>(apiUrl));
      this.apiData[controlName] = data['data'] || data;
      this.apiDataChange.emit(this.apiData);
    } catch (error) {
      console.error(`Error fetching data from ${apiUrl}:`, error);
    }
  }

  updateFontWeights(c: AbstractControl): void {
    const selectedFontFamily = c.value;
    const parentFormGroup = c.parent;

    const font = this.fontFamilies.find(family => family.family === selectedFontFamily) || this.fontFamilies.find(f => f.family === 'Noto Sans Gujarati');
    const fontWeights = font ? font.variables : [];
    const currentValue = parentFormGroup?.get('fw')?.value;

    if (parentFormGroup && !fontWeights.includes(currentValue)) {
      parentFormGroup.get('fw')?.patchValue(fontWeights[0] || '400');
    }
  }

  getColorClass(isActive: boolean): string {
    return isActive ? '' : 'shadow border border-light border-3';
  }

  updateColor(event: Event, control: any): void {
    const value = (event.target as HTMLInputElement).value;
    control.setValue(value);
  }

  private setupFontFamilySubscription(): void {
    const fontFamilyControl = this.formGroupData?.get('fontFamily') as FormControl;
    if (fontFamilyControl) {
      this.updateFontWeights(fontFamilyControl);
      const sub = fontFamilyControl.valueChanges.subscribe(() => this.updateFontWeights(fontFamilyControl));
      this._subscriptions.push(sub);
    }
  }

  private teardownSubscriptions(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
    this._subscriptions = [];
  }

  private async loadData(key: string, api: string): Promise<void> {
    if (!this.apiData[key]) {
      await this.fetchDataFromAPI(api, key);
    }
  }

  private setupDependency(
    key: string,
    data: { control: FormControl; api: string; dependency: string }
  ): void {
    const dependencyControl = this.selectData[data.dependency]?.control;

    if (dependencyControl) {
      const sub = dependencyControl.valueChanges.subscribe(async (value) => {
        await this.fetchDataFromAPI(`${data.api}${value}`, key);
        data.control.setValue(this.selectData[key].title, { emitEvent: true });
      });

      this._subscriptions.push(sub);

      // Initial fetch
      if (dependencyControl.value) {
        this.fetchDataFromAPI(`${data.api}${dependencyControl.value}`, key);
      }
    }
  }
  private initializeData(): void {
    for (const key in this.selectData) {
      const data = this.selectData[key];
      if (data.dependency === 'none') {
        this.loadData(key, data.api);
      } else {
        this.setupDependency(key, data);
      }
    }
  }
}
