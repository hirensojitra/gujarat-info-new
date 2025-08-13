import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CircleProperties,
  EllipseProperties,
  ImageElement,
  LineProperties,
  PostCategory,
  PostDetails,
  PostSubcategory,
  RectProperties,
  SvgProperties,
  TextElement,
} from 'src/app/common/interfaces/image-element';
import { ColorService } from 'src/app/common/services/color.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
import { FontService } from 'src/app/common/services/fonts.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/common/services/toast.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { PostThumbService } from 'src/app/common/services/post-thumb.service';
import { forkJoin, Observable } from 'rxjs';
import { CategoryService } from 'src/app/common/services/category.service';
import { NewPostDetailService } from 'src/app/common/services/new-post-detail.service';
declare const bootstrap: any;
interface FontStyles {
  [fontFamily: string]: Set<string>;
}
interface Data {
  title: string;
  editable: boolean;
  boxed: boolean;
  rect?: RectProperties;
  circle?: CircleProperties;
  ellipse?: EllipseProperties;
  line?: LineProperties;
  text?: TextElement;
  image?: ImageElement;
}
interface ShapeControl {
  id: string;
  title: string;
  active: boolean;
  icon: string;
}

interface ShapeControls {
  rect: ShapeControl[];
  circle: ShapeControl[];
  ellipse: ShapeControl[];
  line: ShapeControl[];
  text: ShapeControl[];
  image: ShapeControl[];
}
@Component({
  selector: 'app-post-generate',
  templateUrl: './post-generate.component.html',
  styleUrls: ['./post-generate.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('* => void', [
        animate('200ms', style({ opacity: 0, transform: 'scale(0.95)' })),
      ]),
    ]),
  ],
})
export class PostGenerateComponent implements OnInit, AfterViewInit {
  Seq: number = 1;
  isExpanded: boolean = false;
  selectedElement: number | null = null;
  colorSet: string[] = [];
  activeControlIndex!: number;
  controlSet: ShapeControl[][] = [];
  categories$: Observable<PostCategory[]>;
  subcategories$: Observable<PostSubcategory[]>;
  controlValues: ShapeControls = {
    rect: [
      { id: 'border', title: 'Border', icon: 'fa-x-border', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      { id: 'rotate', title: 'Rotation', icon: 'fa-x-rotation', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ],
    circle: [
      { id: 'border', title: 'Border', icon: 'fa-x-border', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ],
    ellipse: [
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'originX', title: 'originX', icon: 'fa-', active: false },
      { id: 'originY', title: 'originY', icon: 'fa-', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ],
    line: [
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'originX', title: 'originX', icon: 'fa-', active: false },
      { id: 'originY', title: 'originY', icon: 'fa-', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ],
    text: [
      { id: 'typography', title: 'Typography', icon: 'fa-font', active: true },
      { id: 'edit', title: 'Edit', icon: 'fa-x-edit', active: false },
      {
        id: 'textShadow',
        title: 'Shadow',
        icon: 'fa-eye-slash',
        active: false,
      },
      {
        id: 'textBackground',
        title: 'Background',
        icon: 'fa-x-text-background',
        active: false,
      },
      { id: 'textEffects', title: 'Effects', icon: 'fa-magic', active: false },
      {
        id: 'textTransformation',
        title: 'Transformation',
        icon: 'fa-text-width',
        active: false,
      },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
      { id: 'rotate', title: 'Rotation', icon: 'fa-x-rotation', active: false },
    ],
    image: [
      {
        id: 'position',
        title: 'Position',
        icon: 'fa-x-position',
        active: false,
      },
      { id: 'edit', title: 'Edit', icon: 'fa-x-edit', active: false },
      {
        id: 'dimension',
        title: 'Dimension',
        icon: 'fa-x-dimension',
        active: false,
      },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-x-rotation', active: false },
      { id: 'url', title: 'URL', icon: 'fa-link', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ],
  };
  fontFamilies: { family: string; variables: string[]; names: string[] }[] = [];
  postDetailsForm: FormGroup | undefined = undefined;
  imgParam: any;
  postDetails: PostDetails = {
    id: null,
    deleted: false,
    download_counter: 0,
    h: 1024,
    w: 1024,
    title: 'image',
    info: '',
    info_show: true,
    published: false,
    track: false,
    backgroundurl:
      'https://images.unsplash.com/photo-1536663094815-aa7e99627504?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    data: [
      {
        title: 'Text 1',
        editable: true,
        boxed: true,
        text: {
          x: 706,
          y: 955,
          fs: 40,
          fw: 'normal',
          text: 'Sample Text',
          type: 'text',
          color: '#FFFFFF',
          fontStyle: {
            italic: false,
            underline: false,
          },
          rotate: 0,
          fontFamily: 'Noto Sans Gujarati',
          textShadow: {
            enable: false,
            color: '#FFFFFF',
            blur: 0,
            offsetX: 0,
            offsetY: 0,
          },
          backgroundColor: '#FFFFFF',
          textEffects: {
            enable: false,
            gradient: {
              enable: false,
              startColor: '#ffffff',
              endColor: '#000000',
              direction: 'horizontal',
            },
            outline: {
              enable: false,
              color: '#FFFFFF',
              width: 2,
            },
            glow: {
              enable: false,
              color: '#ffffff',
              blur: 0,
            },
          },
          textAnchor: 'start',
          alignmentBaseline: 'start',
          letterSpacing: 0,
          lineHeight: 1.5,
          textTransformation: 'none',
          opacity: 100,
          originX: 0,
          originY: 0,
        },
      },
    ],
  };
  confirmDelete: any;
  apiData: { [key: string]: any[] } = {};
  selectData: {
    [key: string]: {
      title: string;
      control: FormControl;
      api: string;
      dependency: string;
      lang: string;
    };
  } = {};
  positionShuffle: boolean = false;
  activeMap: { [rectIndex: number]: Set<string> } = {};

  // Whenever controlSet is loaded/updated:
  private buildActiveMap(): void {
    this.activeMap = this.controlSet.map(
      (controls) => new Set(controls.filter((c) => c.active).map((c) => c.id))
    );
  }
  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private route: ActivatedRoute,
    private PS: PostDetailService,
    private fontService: FontService,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService,
    private postThumb: PostThumbService,
    private categoryService: CategoryService,
    private postService: NewPostDetailService
  ) {
    console.log('constructor: ' + this.Seq++);
    this.route.queryParams.subscribe((params) => {
      this.imgParam = params['img'];
    });
    this.fontFamilies = this.fontService.fontFamilies;
  }
  async getColors(image: string, colorCounts: number) {
    console.log('getColors: ' + this.Seq++);
    try {
      this.colorSet = await this.colorService.getColors(image, colorCounts);
    } catch (error) {
      console.error('Error updating colors:', error);
    }
  }
  getColorClass(isActive: boolean): string {
    console.log('getColorClass: ' + this.Seq++);
    if (isActive) {
      return '';
    } else {
      return 'shadow border border-light border-3';
    }
  }
  updateColor(event: any, control: any) {
    console.log('updateColor: ' + this.Seq++);
    const value = (event.target as HTMLInputElement).value;
    control?.setValue(value);
  }
  updateValue(d: { data: Data; index: number }) {
    console.log('updateValue: ' + this.Seq++);
    const value = this.postDetailsForm?.get('data') as FormArray | null;
    if (value) {
      const t = value.at(d.index) as FormControl | null;
      if (t) {
        const newData = d.data;
        if (newData.text) {
          if (newData.text.x) {
            t.get('text')
              ?.get('x')
              ?.patchValue(newData.text.x, { emitEvent: false });
          }
          if (newData.text.y) {
            t.get('text')
              ?.get('y')
              ?.patchValue(newData.text.y, { emitEvent: false });
          }
        }
        if (newData.image) {
          if (newData.image.x) {
            t.get('image')
              ?.get('x')
              ?.patchValue(newData.image.x, { emitEvent: false });
          }
          if (newData.image.y) {
            t.get('image')
              ?.get('y')
              ?.patchValue(newData.image.y, { emitEvent: false });
          }
        }
        if (newData.rect) {
          if (newData.rect.x) {
            t.get('rect')
              ?.get('x')
              ?.patchValue(newData.rect.x, { emitEvent: false });
          }
          if (newData.rect.y) {
            t.get('rect')
              ?.get('y')
              ?.patchValue(newData.rect.y, { emitEvent: false });
          }
        }
        if (newData.circle) {
          if (newData.circle.cx) {
            t.get('circle')
              ?.get('cx')
              ?.patchValue(newData.circle.cx, { emitEvent: false });
          }
          if (newData.circle.cy) {
            t.get('circle')
              ?.get('cy')
              ?.patchValue(newData.circle.cy, { emitEvent: false });
          }
        }
        if (newData.ellipse) {
          if (newData.ellipse.cx) {
            t.get('ellipse')
              ?.get('cx')
              ?.patchValue(newData.ellipse.cx, { emitEvent: false });
          }
          if (newData.ellipse.cy) {
            t.get('ellipse')
              ?.get('cy')
              ?.patchValue(newData.ellipse.cy, { emitEvent: false });
          }
        }
      } else {
        console.error(`Form control at index ${d.index} not found.`);
      }
    } else {
      console.error(`Form array 'data' not found.`);
    }
    this.postDetails.data = value?.value;
  }
  getSelected(d: { index: number }) {
    console.log('getSelected: ' + this.Seq++);
    this.selectedElement = d.index;
  }
  getPostById(postId: any): void {
    console.log('getPostById: ' + this.Seq++);
    this.postService.getPostById(postId).subscribe(
      (post) => {
        if (post) {
          console.log('Post fetched successfully:', post);
          // Map the fetched post to match the local PostDetails interface
          this.postDetails = {
            ...post,
            data: (post.data || []).map((item: any) => {
              // Ensure all required properties exist and have defaults
              return {
                ...item,
                rect: item.rect
                  ? {
                      originX: item.rect.originX ?? 0,
                      originY: item.rect.originY ?? 0,
                      ...item.rect,
                    }
                  : undefined,
                circle: item.circle
                  ? {
                      originX: item.circle.originX ?? 0,
                      originY: item.circle.originY ?? 0,
                      ...item.circle,
                    }
                  : undefined,
                ellipse: item.ellipse
                  ? {
                      originX: item.ellipse.originX ?? 0,
                      originY: item.ellipse.originY ?? 0,
                      ...item.ellipse,
                    }
                  : undefined,
                line: item.line
                  ? {
                      originX: item.line.originX ?? 0,
                      originY: item.line.originY ?? 0,
                      ...item.line,
                    }
                  : undefined,
                text: item.text
                  ? {
                      originX: item.text.originX ?? 0,
                      originY: item.text.originY ?? 0,
                      ...item.text,
                    }
                  : undefined,
                image: item.image
                  ? {
                      origin: item.image.origin ?? 'center',
                      ...item.image,
                    }
                  : undefined,
              };
            }),
          };
          this.initForm();
        } else {
          console.error('Post not found');
        }
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }
  dataArray!: FormArray;
  initForm() {
    console.log('initForm: ' + this.Seq++);
    console.log(this.postDetails.category);
    this.postDetailsForm = this.fb.group({
      id: [this.postDetails.id],
      deleted: [this.postDetails.deleted, Validators.required],
      h: [this.postDetails.h, Validators.required],
      w: [this.postDetails.w, Validators.required],
      title: [this.postDetails.title, Validators.required],
      backgroundurl: [this.postDetails.backgroundurl, Validators.required],
      download_counter: [
        this.postDetails.download_counter,
        Validators.required,
      ],
      info: [this.postDetails.info || '', Validators.required],
      info_show: [this.postDetails.info_show || false],
      published: [this.postDetails.published || false],
      track: [this.postDetails.track || false],
      category_id: [this.postDetails.category?.id, Validators.required],
      subcategory_id: [this.postDetails.subcategory?.id, Validators.required],
      data: this.fb.array([]),
      apiData: this.apiData,
    });
    this.postDetailsForm
      ?.get('backgroundurl')
      ?.valueChanges.subscribe(async (v) => {
        this.postDetails.backgroundurl = v;
        await this.getColors(v, 20);
      });
    this.postDetailsForm.valueChanges.subscribe(async (v) => {
      this.postDetails = v;
    });
    this.postDetailsForm.get('category_id').valueChanges.subscribe((val) => {
      this.onCategoryChange();
    });
    this.categories$ = this.categoryService.getCategories();
    if (this.postDetails.category?.id) {
      this.subcategories$ = this.categoryService.getSubcategories(
        this.postDetails.category?.id
      );
    }
    this.getColors(this.postDetails.backgroundurl, 10);
    this.dataArray = this.postDetailsForm.get('data') as FormArray;
    this.postDetails.data.forEach((d) => {
      d.rect && this.addData('rect', d);
      d.circle && this.addData('circle', d);
      d.ellipse && this.addData('ellipse', d);
      d.line && this.addData('line', d);
      d.text && this.addData('text', d);
      d.image && this.addData('image', d);
    });
    this.rebuild(this.postDetails.data);
  }

  onCategoryChange(): void {
    const categoryId = this.postDetailsForm.get('category_id').value;
    if (categoryId) {
      this.subcategories$ = this.categoryService.getSubcategories(categoryId);
      console.log('Subcategories loaded for category:', categoryId);
      this.postDetailsForm.get('subcategory_id').setValue(null);
    }
  }

  addData(t: string, value?: Data) {
    console.log('addData: ' + this.Seq++);

    let d: FormGroup = this.fb.group({});
    switch (t) {
      case 'rect':
        d = this.createRectFormGroup(value || this.rectData);
        this.controlSet.push(this.controlValues.rect);
        break;
      case 'circle':
        d = this.createCircleFormGroup(value || this.circleData);
        this.controlSet.push(this.controlValues.circle);
        break;
      case 'ellipse':
        d = this.createEllipseFormGroup(value || this.ellipseData);
        this.controlSet.push(this.controlValues.ellipse);
        break;
      case 'line':
        d = this.createLineFormGroup(value || this.lineData);
        this.controlSet.push(this.controlValues.line);
        break;
      case 'text':
        d = this.createTextFormGroup(value || this.textData);
        this.controlSet.push(this.controlValues.text);
        break;
      case 'image':
        d = this.createImageFormGroup(value || this.imageData);
        this.controlSet.push(this.controlValues.image);
        break;
      default:
        console.error('Invalid type');
        break;
    }
    d && this.dataArray.push(d);
    this.postDetails = this.postDetailsForm?.value;
    this.selectedElement = this.dataArray.length;
  }
  removeData(index: number) {
    console.log('removeData: ' + this.Seq++);
    const d = this.dataArray.at(index);
    const cn = d.get('text')?.get('controlName')?.value;
    let canDelete: string[] = [];
    if (cn) {
      canDelete = this.checkDependency(cn, index);
    }
    if (!canDelete.length) {
      this.apiData[cn] && delete this.apiData[cn];
      this.dataArray.removeAt(index);
      this.postDetails = this.postDetailsForm?.value;
      this.positionShuffle = true;
      this.rebuild(this.postDetails.data);
      this.positionShuffle = false;
      this.toastService.show(
        d.get('title')?.value + ' is deleted successfully.',
        { class: 'bg-success' }
      );
    } else {
      this.toastService.show(
        canDelete.join(', ') +
          (canDelete.length > 1 ? ' are' : ' is') +
          ' depend on ' +
          d.get('title')?.value +
          '.',
        {
          title: d.get('title')?.value + " can't be deleted.",
          class: 'bg-danger',
        }
      );
    }
    this.selectedElement = this.postDetails.data.length;
  }
  /**
   * Clone the data item at `index` and insert the duplicate before it.
   */
  duplicateData(index: number) {
    console.log('duplicateData: ' + this.Seq++);
    // 1) Get the source group and its plain value
    const srcGroup = this.dataArray.at(index) as FormGroup;
    const srcValue = srcGroup.getRawValue() as Data;

    // 2) Deep‐clone so we don't keep object references
    const clonedValue: Data = JSON.parse(JSON.stringify(srcValue));

    // 3) Build a new FormGroup for the clone, matching its type
    let newGroup: FormGroup;
    let newControls: ShapeControl[];
    if (clonedValue.rect) {
      newGroup = this.createRectFormGroup(clonedValue);
      newControls = this.controlValues.rect;
    } else if (clonedValue.circle) {
      newGroup = this.createCircleFormGroup(clonedValue);
      newControls = this.controlValues.circle;
    } else if (clonedValue.ellipse) {
      newGroup = this.createEllipseFormGroup(clonedValue);
      newControls = this.controlValues.ellipse;
    } else if (clonedValue.line) {
      newGroup = this.createLineFormGroup(clonedValue);
      newControls = this.controlValues.line;
    } else if (clonedValue.text) {
      newGroup = this.createTextFormGroup(clonedValue);
      newControls = this.controlValues.text;
    } else if (clonedValue.image) {
      newGroup = this.createImageFormGroup(clonedValue);
      newControls = this.controlValues.image;
    } else {
      console.error('duplicateData: unrecognized data type at index', index);
      return;
    }

    // 4) Insert both the form‐group and its control‐set before the original
    this.dataArray.insert(index, newGroup);
    this.controlSet.splice(index, 0, newControls);

    // 5) Trigger your rebuild logic
    this.postDetails = this.postDetailsForm!.value;
    this.positionShuffle = true;
    this.rebuild(this.postDetails.data);
    this.positionShuffle = false;

    // 6) Notify the user
    const title = newGroup.get('title')?.value || 'Item';
    this.toastService.show(`"${title}" duplicated successfully.`, {
      class: 'bg-success',
    });
    this.selectedElement = this.postDetails.data.length;
  }

  private checkDependency(controlName: string, index: number): string[] {
    console.log('checkDependency: ' + this.Seq++);
    const hasDependency: string[] = [];
    this.dataArray.controls.some((control, i) => {
      if (i !== index) {
        const cn = control.get('text')?.get('dependency')?.value;

        if (cn === controlName) {
          hasDependency.push(control.get('title')?.value);
        }
        return cn === controlName;
      }
      return false;
    });

    return hasDependency;
  }

  rectData = {
    title: 'Rect',
    editable: false,
    boxed: true,
    rect: {
      x: 30,
      y: 30,
      width: 100,
      height: 100,
      fill: '#FFFFFF',
      opacity: 1,
      originX: 5,
      originY: 5,
      rotate: 0,
    },
  };
  createRectFormGroup(r: Data): FormGroup {
    console.log('createRectFormGroup: ' + this.Seq++);
    return this.fb.group({
      title: [r.title || '', Validators.required],
      editable: [r.editable || false],
      boxed: [r.boxed || false],
      rect: this.fb.group({
        x: [r.rect?.x || 0, Validators.required],
        y: [r.rect?.y || 0, Validators.required],
        rx: [r.rect?.rx || 0, Validators.required],
        ry: [r.rect?.ry || 0, Validators.required],
        width: [r.rect?.width || 150, Validators.required],
        height: [r.rect?.height || 150, Validators.required],
        fill: [r.rect?.fill || '#000000', Validators.required],
        opacity: [r.rect?.opacity || '1', Validators.required],
        originX: [r.rect?.originX || 0, Validators.required],
        originY: [r.rect?.originY || 0, Validators.required],
        rotate: [r.rect?.rotate || 0, Validators.required],
        stroke: [r.rect?.stroke || '#000000', Validators.required],
        strokeWidth: [r.rect?.strokeWidth || 1, Validators.required],
        strokeAlignment: [
          r.rect?.strokeAlignment || 'center',
          Validators.required,
        ],
        fillOpacity: [r.rect?.fillOpacity || 1, Validators.required],
        strokeOpacity: [r.rect?.strokeOpacity || 1, Validators.required],
      }),
    });
  }

  circleData = {
    title: 'Circle 1',
    editable: false,
    boxed: true,
    circle: {
      cx: 50,
      cy: 50,
      r: 30,
      fill: '#FFFFFF',
      opacity: 1,
      originX: 0,
      originY: 0,
    },
  };

  createCircleFormGroup(c: Data): FormGroup {
    console.log('createCircleFormGroup: ' + this.Seq++);
    return this.fb.group({
      title: [c.title, Validators.required],
      editable: [c.editable],
      boxed: [c.boxed],
      circle: this.fb.group({
        cx: [c.circle?.cx, Validators.required],
        cy: [c.circle?.cy, Validators.required],
        r: [c.circle?.r, Validators.required],
        fill: [c.circle?.fill, Validators.required],
        fillOpacity: [c.circle?.fillOpacity || 1, Validators.required],
        opacity: [c.circle?.opacity, Validators.required],
        originX: [c.circle?.originX, Validators.required],
        originY: [c.circle?.originY, Validators.required],
        stroke: [c.circle?.stroke || '#FFF', Validators.required],
        strokeWidth: [c.circle?.strokeWidth || 0, Validators.required],
        strokeOpacity: [c.circle?.strokeOpacity || 1, Validators.required],
        strokeAlignment: [
          c.circle?.strokeAlignment || 'center',
          Validators.required,
        ],
      }),
    });
  }
  ellipseData = {
    title: 'Ellipse 1',
    editable: false,
    boxed: true,
    ellipse: {
      cx: 100,
      cy: 100,
      rx: 50,
      ry: 30,
      fill: 'green',
      opacity: 0.8,
      originX: 0,
      originY: 0,
      rotate: 0,
    },
  };
  createEllipseFormGroup(e: Data): FormGroup {
    console.log('createEllipseFormGroup: ' + this.Seq++);
    return this.fb.group({
      title: [e.title || '', Validators.required],
      editable: [e.editable || false],
      boxed: [e.boxed || false],
      ellipse: this.fb.group({
        cx: [e.ellipse?.cx || 0, Validators.required],
        cy: [e.ellipse?.cy || 0, Validators.required],
        rx: [e.ellipse?.rx || 50, Validators.required], // Default rx to 50 if not provided
        ry: [e.ellipse?.ry || 50, Validators.required], // Default ry to 50 if not provided
        fill: [e.ellipse?.fill || '#000000', Validators.required],
        fillOpacity: [e.ellipse?.fillOpacity || 1, Validators.required], // Added fillOpacity with default 1
        opacity: [e.ellipse?.opacity || 1, Validators.required],
        originX: [e.ellipse?.originX || 0, Validators.required],
        originY: [e.ellipse?.originY || 0, Validators.required],
        rotate: [e.ellipse?.rotate || 0, Validators.required],
        stroke: [e.ellipse?.stroke || '#000000', Validators.required], // Added stroke with default '#000000'
        strokeWidth: [e.ellipse?.strokeWidth || 1, Validators.required], // Added strokeWidth with default 1
        strokeOpacity: [e.ellipse?.strokeOpacity || 1, Validators.required], // Added strokeOpacity with default 1
        strokeAlignment: [
          e.ellipse?.strokeAlignment || 'center',
          Validators.required,
        ], // Added strokeAlignment with default 'center'
      }),
    });
  }

  lineData = {
    title: 'Line 1',
    editable: false,
    boxed: true,
    line: {
      x1: 50,
      y1: 50,
      x2: 150,
      y2: 150,
      stroke: 'black',
      strokeWidth: 2,
      opacity: 1,
      originX: 0,
      originY: 0,
      rotate: 0,
    },
  };

  createLineFormGroup(l: Data): FormGroup {
    console.log('createLineFormGroup: ' + this.Seq++);
    return this.fb.group({
      title: [l.title, Validators.required],
      editable: [l.editable],
      boxed: [l.boxed],
      line: this.fb.group({
        x1: [l.line?.x1, Validators.required],
        y1: [l.line?.y1, Validators.required],
        x2: [l.line?.x2, Validators.required],
        y2: [l.line?.y2, Validators.required],
        stroke: [l.line?.stroke, Validators.required],
        strokeWidth: [l.line?.strokeWidth, Validators.required],
        opacity: [l.line?.opacity, Validators.required],
        originX: [l.line?.originX, Validators.required],
        originY: [l.line?.originY, Validators.required],
        rotate: [l.line?.rotate, Validators.required],
      }),
    });
  }
  textData: {
    title: string;
    editable: boolean;
    boxed: boolean;
    text: TextElement;
  } = {
    title: 'Text 1',
    editable: true,
    boxed: true,
    text: {
      x: 100,
      y: 100,
      fs: 40,
      fw: 'normal',
      text: 'Sample Text',
      type: 'text',
      color: '#FFFFFF',
      fontStyle: {
        italic: false,
        underline: false,
      },
      rotate: 0,
      fontFamily: 'Noto Sans Gujarati',
      textShadow: {
        enable: false,
        color: '#FFFFFF',
        blur: 0,
        offsetX: 0,
        offsetY: 0,
      },
      backgroundColor: '#FFFFFF',
      textEffects: {
        enable: false,
        gradient: {
          enable: false,
          startColor: '#ffffff',
          endColor: '#000000',
          direction: 'horizontal',
        },
        outline: {
          enable: false,
          color: '#FFFFFF',
          width: 2,
        },
        glow: {
          enable: false,
          color: '#ffffff',
          blur: 0,
        },
      },
      textAnchor: 'start',
      alignmentBaseline: 'middle',
      letterSpacing: 0,
      lineHeight: 1.5,
      textTransformation: 'none',
      opacity: 100,
      originX: 0,
      originY: 0,
    },
  };
  createTextFormGroup(t: Data): FormGroup {
    console.log('createTextFormGroup: ' + this.Seq++);
    const textForm = this.fb.group({
      title: [t.title, Validators.required],
      editable: [t.editable],
      boxed: [t.boxed],
      text: this.fb.group({
        x: [t.text?.x, Validators.required],
        y: [t.text?.y, Validators.required],
        fs: [t.text?.fs, Validators.required],
        fw: [t.text?.fw, Validators.required],
        type: [t.text?.type || 'text', Validators.required],
        text: [t.text?.text, Validators.required],
        color: [t.text?.color, Validators.required],
        fontStyle: this.fb.group({
          italic: [t.text?.fontStyle.italic, Validators.required],
          underline: [t.text?.fontStyle.underline, Validators.required],
        }),
        rotate: [t.text?.rotate, Validators.required],
        fontFamily: [t.text?.fontFamily, Validators.required],
        textShadow: this.fb.group({
          enable: [t.text?.textShadow.enable],
          color: [t.text?.textShadow.color],
          blur: [t.text?.textShadow.blur],
          offsetX: [t.text?.textShadow.offsetX],
          offsetY: [t.text?.textShadow.offsetY],
        }),
        backgroundColor: [t.text?.backgroundColor, Validators.required],
        textEffects: this.fb.group({
          enable: [false],
          gradient: this.fb.group({
            enable: [false],
            startColor: [
              t.text?.textEffects.gradient.startColor,
              Validators.required,
            ],
            endColor: [
              t.text?.textEffects.gradient.endColor,
              Validators.required,
            ],
            direction: [
              t.text?.textEffects.gradient.direction,
              Validators.required,
            ],
          }),
          outline: this.fb.group({
            enable: [false],
            color: [t.text?.textEffects.outline.color, Validators.required],
            width: [t.text?.textEffects.outline.width, Validators.required],
          }),
          glow: this.fb.group({
            enable: [false],
            color: [t.text?.textEffects.glow.color, Validators.required],
            blur: [t.text?.textEffects.glow.blur, Validators.required],
          }),
        }),
        textAnchor: [t.text?.textAnchor],
        alignmentBaseline: [t.text?.textAnchor],
        letterSpacing: [t.text?.letterSpacing, Validators.required],
        lineHeight: [t.text?.lineHeight, Validators.required],
        textTransformation: [t.text?.textTransformation, Validators.required],
        opacity: [t.text?.opacity, Validators.required],
        originX: [t.text?.originX],
        originY: [t.text?.originY],
      }),
    });
    const cn = t.text?.controlName ?? Math.random().toString(36).substring(7);
    const textFormGroup = textForm.get('text') as FormGroup;

    if (t.text?.type === 'select') {
      this.addSelectControls(textForm, textFormGroup, t, cn);
    }

    textForm.get('text.type')?.valueChanges.subscribe((type: any) => {
      if (type === 'select') {
        this.addSelectControls(textForm, textFormGroup, t, cn);
      } else {
        this.removeSelectControls(textFormGroup);
      }
    });

    return textForm;
  }
  async fetchDataFromAPI(apiUrl: string, controlName: string): Promise<void> {
    console.log('fetchDataFromAPI: ' + this.Seq++);
    await this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.apiData[controlName] = data['data'] || data;
      },
      error: () => {},
    });
  }
  async syncData(control: AbstractControl | null) {
    console.log('syncData: ' + this.Seq++);
    if (!(control instanceof FormGroup)) {
      console.error('Invalid form group');
      return;
    }

    const dependency = control.get('dependency')?.value;
    const cn = control.get('controlName')?.value;
    let api = control.get('api')?.value;

    if (cn && api) {
      api = api.endsWith('/') ? api : `${api}/`;
      if (dependency) {
        const m = this.selectData[dependency]?.control?.value;
        if (m) {
          api += m;
        }
      }
      await this.fetchDataFromAPI(api, cn);
    }
  }

  getControlByKey(key: string) {
    console.log('getControlByKey: ' + this.Seq++);
    return this.selectData[key];
  }
  dependencyList(key: string): { title: string; value: string }[] {
    console.log('dependencyList: ' + this.Seq++);
    const result: { title: string; value: string }[] = [];
    for (const k in this.selectData) {
      if (k !== key) {
        result.push({ title: this.selectData[k].title, value: k });
      }
    }
    console.log(result);
    return result;
  }
  private addSelectControls(
    textForm: FormGroup,
    textFormGroup: FormGroup,
    t: Data,
    cn: string
  ) {
    console.log('addSelectControls: ' + this.Seq++);
    this.selectData[cn] = {
      title: textForm.get('title')?.value || '',
      control: textFormGroup.get('text') as FormControl,
      api: t.text?.api as string,
      dependency: t.text?.dependency || 'none',
      lang: t.text?.lang || 'en',
    };
    if (!textFormGroup.contains('lang')) {
      textFormGroup.addControl(
        'lang',
        new FormControl(t.text?.lang, Validators.required)
      );
    }
    if (!textFormGroup.contains('controlName')) {
      textFormGroup.addControl(
        'controlName',
        new FormControl(t.text?.controlName || cn, Validators.required)
      );
    }
    if (!textFormGroup.contains('dependency')) {
      textFormGroup.addControl(
        'dependency',
        new FormControl(t.text?.dependency || 'none', Validators.required)
      );
    }
    if (!textFormGroup.contains('api')) {
      textFormGroup.addControl(
        'api',
        new FormControl(t.text?.api, Validators.required)
      );
    }
  }
  private removeSelectControls(textFormGroup: FormGroup) {
    console.log('removeSelectControls: ' + this.Seq++);
    if (textFormGroup.contains('lang')) {
      textFormGroup.removeControl('lang');
    }
    if (textFormGroup.contains('controlName')) {
      textFormGroup.removeControl('controlName');
    }
    if (textFormGroup.contains('dependency')) {
      textFormGroup.removeControl('dependency');
    }
    if (textFormGroup.contains('api')) {
      textFormGroup.removeControl('api');
    }
  }
  createSvgPropertiesFormGroup(svg: SvgProperties): FormGroup {
    console.log('createSvgPropertiesFormGroup: ' + this.Seq++);
    return this.fb.group({
      fill: [svg.fill, Validators.required],
      stroke: [svg.stroke, Validators.required],
      strokeWidth: [svg.strokeWidth, Validators.required],
    });
  }
  imageData = {
    title: 'Image 1',
    editable: true,
    boxed: true,
    image: {
      r: 50,
      x: 100,
      y: 100,
      imageUrl: 'assets/images/svg/upload-img.svg',
      borderColor: '#000000',
      borderWidth: 2,
      shape: 'circle',
      origin: 'center',
      placeholder: 'Placeholder Text',
      svgProperties: {
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
      },
      rotate: 0,
    },
  };
  createImageFormGroup(i: Data): FormGroup {
    console.log('createImageFormGroup: ' + this.Seq++);
    return this.fb.group({
      title: [i.title, Validators.required],
      editable: [i.editable],
      boxed: [i.boxed],
      image: this.fb.group({
        r: [i.image?.r, Validators.required],
        x: [i.image?.x, Validators.required],
        y: [i.image?.y, Validators.required],
        imageUrl: [i.image?.imageUrl, Validators.required],
        borderColor: [i.image?.borderColor, Validators.required],
        borderWidth: [i.image?.borderWidth, Validators.required],
        shape: [i.image?.shape, Validators.required],
        origin: [i.image?.origin, Validators.required],
        placeholder: [i.image?.placeholder, Validators.required],
        svgProperties: this.createSvgPropertiesFormGroup(
          i.image?.svgProperties!
        ),
        rotate: [i.image?.rotate],
      }),
    });
  }
  async drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.postDetails.data,
      event.previousIndex,
      event.currentIndex
    );
    this.positionShuffle = true;
    await this.rebuild(this.postDetails.data);
    this.positionShuffle = false;
  }
  setActiveControl(rectIndex: number, controlIndex: number) {
    this.controlSet[rectIndex].forEach(
      (c, idx) => (c.active = idx === controlIndex)
    );
    this.buildActiveMap();
  }
  getActiveControl(rectIndex: number, controlId: string): boolean {
    return this.activeMap[rectIndex]?.has(controlId) ?? false;
  }

  toggleExpand(event: Event) {
    console.log('toggleExpand: ' + this.Seq++);
    event.stopPropagation();
    this.isExpanded = !this.isExpanded;
  }
  scaleFactor = 1;
  // offsetX = 0;
  // offsetY = 0;

  // @HostListener('wheel', ['$event'])
  // onWheel(event: WheelEvent) {
  //   event.preventDefault();
  //   const delta = Math.sign(event.deltaY);
  //   const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  //   const mouseX = event.clientX - rect.left;
  //   const mouseY = event.clientY - rect.top;
  //   const scaleFactorChange = delta * 0.1;
  //   this.zoomAt(mouseX, mouseY, scaleFactorChange);
  // }

  onTouch(event: TouchEvent) {
    //   event.preventDefault();
    //   if (event.touches.length === 2) {
    //     const touch1 = event.touches[0];
    //     const touch2 = event.touches[1];
    //     const distance = Math.sqrt(
    //       Math.pow(touch2.clientX - touch1.clientX, 2) +
    //       Math.pow(touch2.clientY - touch1.clientY, 2)
    //     );
    //     if (distance > 10) {
    //       const centerX = (touch1.clientX + touch2.clientX) / 2;
    //       const centerY = (touch1.clientY + touch2.clientY) / 2;
    //       const scaleFactorChange = distance / 100;
    //       this.zoomAt(centerX, centerY, scaleFactorChange);
    //     }
    //   }
  }

  // zoomAt(x: number, y: number, scaleFactorChange: number) {
  //   const prevScaleFactor = this.scaleFactor;
  //   this.scaleFactor += scaleFactorChange;
  //   const deltaX = (x - this.offsetX) * (1 - this.scaleFactor / prevScaleFactor);
  //   const deltaY = (y - this.offsetY) * (1 - this.scaleFactor / prevScaleFactor);
  //   this.offsetX -= deltaX;
  //   this.offsetY -= deltaY;
  // }

  moveDown(index: number) {
    const data = this.postDetailsForm?.get('data')?.value;
    if (index > 0) {
      let temp = data[index - 1];
      data[index - 1] = data[index];
      data[index] = temp;
      this.selectedElement = index - 1;
    }
    this.positionShuffle = true;
    this.rebuild(data);
    this.positionShuffle = false;
    return false;
  }
  moveUp(index: number) {
    const data = this.postDetailsForm?.get('data')?.value;
    if (index < data.length - 1) {
      const temp = data[index];
      data[index] = data[index + 1];
      data[index + 1] = temp;
      this.selectedElement = index + 1;
    }
    this.positionShuffle = true;
    this.rebuild(data);
    this.positionShuffle = false;
    return false;
  }

  moveToBack(index: number) {
    const data = this.postDetailsForm?.get('data')?.value;
    if (index > 0) {
      const temp = data[index];
      data.splice(index, 1);
      data.unshift(temp);
      this.selectedElement = 0;
    }
    this.positionShuffle = true;
    this.rebuild(data);
    this.positionShuffle = false;
    return false;
  }
  moveToTop(index: number) {
    const data = this.postDetailsForm?.get('data')?.value;
    if (index < data.length - 1) {
      const temp = data[index];
      data.splice(index, 1);
      data.push(temp);
      this.selectedElement = data.length - 1;
    }
    this.positionShuffle = true;
    this.rebuild(data);
    this.positionShuffle = false;
    return false;
  }
  async rebuild(dataArray: Data[]) {
    console.log('rebuild: ' + this.Seq++);
    console.log('rebuild: ' + this.Seq++);
    this.dataArray.clear();
    this.controlSet = [];
    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      item.rect && this.dataArray.push(this.createRectFormGroup(item));
      item.rect && this.controlSet.push(this.controlValues.rect);
      item.circle && this.dataArray.push(this.createCircleFormGroup(item));
      item.circle && this.controlSet.push(this.controlValues.circle);
      item.ellipse && this.dataArray.push(this.createEllipseFormGroup(item));
      item.ellipse && this.controlSet.push(this.controlValues.ellipse);
      item.line && this.dataArray.push(this.createLineFormGroup(item));
      item.line && this.controlSet.push(this.controlValues.line);
      item.text && this.dataArray.push(this.createTextFormGroup(item));
      item.text && this.controlSet.push(this.controlValues.text);
      item.image && this.dataArray.push(this.createImageFormGroup(item));
      item.image && this.controlSet.push(this.controlValues.image);
    }
    this.postDetailsForm?.get('data')?.setValue(dataArray);
    if (this.positionShuffle == false) {
      for (const key in this.selectData) {
        const data = this.selectData[key];
        if (data.dependency === 'none') {
          await this.loadData(key, data.api);
        } else {
          await this.setupDependency(key, data);
        }
      }
    }
  }
  findInvalidControls() {
    console.log('findInvalidControls: ' + this.Seq++);
    const invalidControls = [];
    if (this.postDetailsForm) {
      const controls = this.postDetailsForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalidControls.push(name);
        }
      }
    }
    return invalidControls;
  }
  private loadData(key: string, api: string) {
    console.log('loadData: ' + this.Seq++);
    if (!this.apiData[key]) {
      this.fetchDataFromAPI(api, key);
    }
  }
  private setupDependency(
    key: string,
    data: {
      title: string;
      control: FormControl;
      api: string;
      dependency: string;
    }
  ) {
    console.log('setupDependency: ' + this.Seq++);
    if (!data.api.endsWith('/')) {
      data.api += '/';
    }
    const dependencyKey = data.dependency;
    const dependencyControl = this.selectData[dependencyKey].control;

    const dependentApi = `${data.api}${dependencyControl.value}`;
    this.fetchDataFromAPI(dependentApi, key);
    dependencyControl.valueChanges.subscribe(async (value) => {
      const dependentApi = `${data.api}${value}`;
      await this.fetchDataFromAPI(dependentApi, key);
      data.control.setValue(data.title, { emitEvent: true });
    });
  }

  onSubmit(isCopy?: boolean) {
    console.log('onSubmit: ' + this.Seq++);
    if (this.postDetailsForm?.valid) {
      const postData = this.postDetailsForm.value;
      delete postData.category_id;
      delete postData.apiData;
      postData.data = postData.data as JSON[];
      const operation$ =
        isCopy == true || this.postDetails.id == null
          ? this.postService.addPost({ ...postData, id: null })
          : this.postService.updatePost(postData);

      operation$.subscribe({
        next: (res) => {
          if (res.id) {
            const postId = res.id;
            this.postDetailsForm?.get('id')?.setValue(postId);
            this.postDetails.id = postId;
            this.router.navigate([], {
              queryParams: { img: postId },
              queryParamsHandling: 'merge',
            });
          }
          this.toastService.show(
            `Post ${isCopy ? 'copied' : 'saved'} successfully`,
            {
              class: 'bg-success text-light',
              delay: 3000,
            }
          );
          this.generateThumbnail()
            .then((blob) => {
              this.uploadThumbnail(this.postDetails.id, blob);
            })
            .catch((error) => {
              console.error('Thumbnail generation failed:', error);
              this.toastService.show('Error generating thumbnail', {
                class: 'bg-warning text-dark',
                delay: 5000,
              });
            });
        },
        error: (err) => {
          console.error('Post operation failed:', err);
          this.toastService.show(`Failed to ${isCopy ? 'copy' : 'save'} post`, {
            class: 'bg-danger text-light',
            delay: 5000,
          });
        },
      });
    } else {
      this.postDetailsForm?.markAllAsTouched();
      this.toastService.show('Please fill all required fields', {
        class: 'bg-warning text-dark',
        delay: 5000,
      });
    }
  }
  addPost(newPostData: PostDetails): void {
    console.log('addPost: ' + this.Seq++);
    this.PS.addPost(newPostData).subscribe(
      (response: PostDetails) => {
        const addedDataId = response.id;
        console.log('Added data ID:', addedDataId);
        this.postDetailsForm?.get('id')?.setValue(addedDataId);
        this.postDetails.id = addedDataId;
        this.router.navigate([], {
          queryParams: { img: addedDataId },
          queryParamsHandling: 'merge',
        });
      },
      (error) => {
        console.error(error); // Handle error appropriately
      }
    );
  }
  @ViewChild('svgElement') svgElement: ElementRef;
  private generateThumbnail(): Promise<Blob> {
    console.log('generateThumbnail: ' + this.Seq++);
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.svgElement?.nativeElement) {
          throw new Error('SVG element not found');
        }

        const svgEl = this.svgElement.nativeElement;
        const fontFamilies = this.getFontStylesFromSVG(svgEl);
        await this.loadFonts(fontFamilies);
        // 1️⃣ Convert all <image> elements to data URIs
        await this.embedImagesAsDataURI(svgEl);

        // 2️⃣ Serialize the SVG to a string
        let svgString = new XMLSerializer().serializeToString(svgEl);
        svgString = svgString.replace(/xmlns="[^"]*"/g, '');
        svgString = svgString.replace(
          /<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"'
        );

        // 3️⃣ Create a data URL from the SVG string
        const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          svgString
        )}`;

        // 4️⃣ Create a canvas and get its context
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // 5️⃣ Set canvas dimensions
        const originalWidth = this.postDetails?.w || 1024;
        const originalHeight = this.postDetails?.h || 1024;
        const targetWidth = 612;
        const targetHeight = Math.round(
          (originalHeight / originalWidth) * targetWidth
        );
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 6️⃣ Create an Image from the SVG
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          try {
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            // 7️⃣ Convert to JPEG with compression
            canvas.toBlob(
              (blob) => {
                if (!blob) {
                  return reject(new Error('Canvas conversion failed'));
                }
                if (blob.size > 100000) {
                  console.log('Compressing image...');
                  canvas.toBlob(
                    (compressedBlob) => resolve(compressedBlob || blob),
                    'image/jpeg',
                    0.7
                  );
                } else {
                  resolve(blob);
                }
              },
              'image/jpeg',
              0.9
            );
          } catch (error) {
            console.error('Error during canvas operations:', error);
            reject(error);
          }
        };

        img.onerror = (error) => {
          console.error('Image loading failed:', error);
          reject(new Error(`Image loading failed: ${error}`));
        };

        img.src = svgUrl;
      } catch (error) {
        console.error('Error in generateThumbnail:', error);
        reject(error);
      }
    });
  }
  getFontStylesFromSVG(svgElement: SVGElement | HTMLElement): FontStyles {
    console.log('getFontStylesFromSVG: ' + this.Seq++);
    const textElements = svgElement.querySelectorAll('text');
    const fontStyles: FontStyles = {}; // Initialize as an empty object
    textElements.forEach((text) => {
      const fontFamily = text.getAttribute('font-family');
      const fontWeight = text.getAttribute('font-weight') || 'normal'; // Default to 'normal' if font-weight is not specified
      if (fontFamily) {
        // Extract font family name from the attribute value
        const fontFamilyName = fontFamily
          .split(',')[0]
          .replace(/['"]/g, '')
          .trim(); // Remove single or double quotes and extra spaces
        if (!fontStyles[fontFamilyName]) {
          fontStyles[fontFamilyName] = new Set<string>();
        }
        fontStyles[fontFamilyName].add(fontWeight);
      }
    });
    return fontStyles;
  }
  async loadFonts(fontStyles: FontStyles) {
    console.log('loadFonts: ' + this.Seq++);
    const svg = this.svgElement.nativeElement;
    let svgDefs =
      (svg.querySelector('defs') as SVGDefsElement) ||
      svg.appendChild(
        document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      );

    let styleElement = svgDefs.querySelector('style') as any | null;
    if (!styleElement) {
      styleElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'style'
      );
      svgDefs.appendChild(styleElement);
    }

    const addedRules = new Set<string>();

    for (const [fontFamily, fontWeights] of Object.entries(fontStyles)) {
      for (const fontWeight of fontWeights) {
        const fontPath = this.fontService.getFontPath(fontFamily, fontWeight);
        const fontData = await this.loadFontAsBase64(
          `assets/fonts/${fontPath}.ttf`
        );
        const fontFaceRule = `@font-face {
          font-family: '${fontFamily}';
          font-style: normal;
          font-weight: ${fontWeight};
          font-stretch: 100%;
          font-display: swap;
          src: url(data:font/truetype;base64,${fontData}) format('truetype');
        }`;

        if (!addedRules.has(fontFaceRule)) {
          styleElement.textContent += fontFaceRule;
          addedRules.add(fontFaceRule);
        }
      }
    }
  }
  async loadFontAsBase64(fontUrl: string): Promise<string> {
    console.log('loadFontAsBase64: ' + this.Seq++);
    const response = await fetch(fontUrl);
    const fontData = await response.arrayBuffer();
    return btoa(
      new Uint8Array(fontData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
  }
  /**
   * 🔹 **Convert all <image> elements inside an SVG to embedded data URIs**
   * This ensures images are loaded before being rendered to canvas.
   */
  private async embedImagesAsDataURI(svgEl: SVGElement): Promise<void> {
    const imageElements = Array.from(svgEl.querySelectorAll('image'));
    const loadImageAsBase64 = (img: SVGImageElement) => {
      return new Promise<void>((resolve) => {
        const href = img.getAttribute('href') || img.getAttribute('xlink:href');
        if (!href || href.startsWith('data:image')) {
          return resolve(); // Skip if it's already a data URI
        }

        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';
        tempImg.src = href;

        tempImg.onload = () => {
          // Convert image to Base64 and set it inside the SVG
          const canvas = document.createElement('canvas');
          canvas.width = tempImg.width;
          canvas.height = tempImg.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(tempImg, 0, 0);
          img.setAttribute('href', canvas.toDataURL('image/png'));
          resolve();
        };

        tempImg.onerror = () => {
          console.warn(`Image failed to load: ${href}`);
          resolve(); // Continue even if one image fails
        };
      });
    };

    // Process all <image> elements
    await Promise.all(imageElements.map(loadImageAsBase64));
  }

  getThumbnailUrl(postId: string): string {
    console.log('getThumbnailUrl: ' + this.Seq++);
    return `${environment.MasterApi}/thumb-images/${postId}`;
  }
  private uploadThumbnail(postId: string, blob: Blob): void {
    console.log('uploadThumbnail: ' + this.Seq++);
    const file = new File([blob], `${postId}.jpg`, {
      type: blob.type || 'image/jpeg',
    });

    this.postThumb.uploadPostThumbs(postId, [file]).subscribe({
      next: () => {
        this.toastService.show('Thumbnail saved successfully', {
          class: 'bg-success text-light',
          delay: 3000,
        });
      },
      error: (err) => {
        console.error('Thumbnail upload failed:', err);
        this.toastService.show('Failed to save thumbnail', {
          class: 'bg-danger text-light',
          delay: 5000,
        });
      },
    });
  }

  uploadThumbnailsBulk(items: [string, Blob][]): void {
    console.log('uploadThumbnailsBulk: ' + this.Seq++);
    const calls: Observable<any>[] = items.map(([postId, blob]) => {
      const file = new File([blob], `${postId}.jpg`, {
        type: blob.type || 'image/jpeg',
      });
      return this.postThumb.uploadPostThumbs(postId, [file]);
    });

    // forkJoin will fire when ALL inner observables complete (or error out if any fail)
    forkJoin(calls).subscribe({
      next: () => {
        this.toastService.show('All thumbnails saved successfully', {
          class: 'bg-success text-light',
          delay: 3000,
        });
      },
      error: (err) => {
        console.error('One or more thumbnail uploads failed', err);
        this.toastService.show('Some thumbnails failed to save', {
          class: 'bg-danger text-light',
          delay: 5000,
        });
      },
    });
  }

  updatePost(newData: PostDetails): void {
    console.log('updatePost: ' + this.Seq++);
    this.PS.updatePost(newData).subscribe(
      (response) => {},
      (error) => {
        console.error(error); // Handle error appropriately
      }
    );
  }
  softDelete(): void {
    console.log('softDelete: ' + this.Seq++);
    const id = this.postDetailsForm?.get('id')?.value;
    id &&
      this.PS.softDeletePost(id).subscribe(
        (response) => {
          console.log('Soft deletion successful:', response);
          this.confirmDelete.hide();
          window.close();
        },
        (error) => {
          console.error('Error during soft deletion:', error);
        }
      );
  }

  hardDelete(): void {
    console.log('hardDelete: ' + this.Seq++);
    const id = this.postDetailsForm?.get('id')?.value;
    id &&
      this.PS.hardDeletePost(id).subscribe(
        (response) => {
          console.log('Hard deletion successful:', response);
        },
        (error) => {
          console.error('Error during hard deletion:', error);
        }
      );
  }
  onScroll(event: any) {
    console.log('onScroll: ' + this.Seq++);
    const element = event.target;
    // Synchronize the horizontal scroll position with the vertical scroll position
    element.scrollLeft = element.scrollLeft;
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    console.log('ngOnInit: ' + this.Seq++);
    this.buildActiveMap();
    this.confirmDelete = new bootstrap.Modal(
      document.getElementById('confirmDelete')!,
      { focus: false, keyboard: false, static: false }
    );
    this.confirmDelete._element.addEventListener('hide.bs.modal', () => {});
    this.confirmDelete._element.addEventListener('show.bs.modal', () => {});
    this.confirmDelete._element.addEventListener('shown.bs.modal', () => {});
    this.imgParam && this.getPostById(this.imgParam);
    !this.imgParam && this.initForm();
  }
  getFormGroup(item: AbstractControl): FormGroup {
    console.log('getFormGroup: ' + this.Seq++);
    return item as FormGroup;
  }
  handleApiDataChange(updatedApiData: { [key: string]: any[] }) {
    console.log('handleApiDataChange: ' + this.Seq++);
    this.apiData = { ...this.apiData, ...updatedApiData };
  }
}
