import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CircleProperties, EllipseProperties, ImageElement, LineProperties, PostDetails, RectProperties, SvgProperties, TextElement } from 'src/app/common/interfaces/image-element';
import { ColorService } from 'src/app/common/services/color.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { PostDetailService } from 'src/app/common/services/post-detail.service';
import { FontService } from 'src/app/common/services/fonts.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/common/services/toast.service';
import { animate, style, transition, trigger } from '@angular/animations';
declare const bootstrap: any;

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
  id: string,
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
  selector: 'app-image-generate',
  templateUrl: './image-generate.component.html',
  styleUrls: ['./image-generate.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition('* => void', [
        animate('200ms', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class ImageGenerateComponent implements OnInit, AfterViewInit {
  isExpanded: boolean = false;
  selectedElement: number | null = null;
  colorSet: string[] = [];
  activeControlIndex!: number;
  controlSet: ShapeControl[][] = [];
  controlValues: ShapeControls = {
    rect: [
      { id: 'border', title: 'Border', icon: 'fa-x-border', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      { id: 'rotate', title: 'Rotation', icon: 'fa-x-rotation', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false }
    ],
    circle: [
      { id: 'border', title: 'Border', icon: 'fa-x-border', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false }],
    ellipse: [
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'originX', title: 'originX', icon: 'fa-', active: false },
      { id: 'originY', title: 'originY', icon: 'fa-', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false }],
    line: [
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'originX', title: 'originX', icon: 'fa-', active: false },
      { id: 'originY', title: 'originY', icon: 'fa-', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false }
    ],
    text: [
      { id: 'edit', title: 'Edit', icon: 'fa-x-edit', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'fontSize', title: 'Size', icon: 'fa-x-font-size', active: false },
      { id: 'fontStyle', title: 'Style', icon: 'fa-italic', active: false },
      { id: 'textAlign', title: 'Alignment', icon: 'fa-align-left', active: false },
      { id: 'fontFamily', title: 'Font', icon: 'fa-font', active: false },
      { id: 'fontWeight', title: 'Weight', icon: 'fa-bold', active: false },
      { id: 'textShadow', title: 'Shadow', icon: 'fa-eye-slash', active: false },
      { id: 'textBackground', title: 'Background', icon: 'fa-x-text-background', active: false },
      { id: 'textEffects', title: 'Effects', icon: 'fa-magic', active: false },
      { id: 'letterSpacing', title: 'Spacing', icon: 'fa-arrows-h', active: false },
      { id: 'lineHeight', title: 'Line Height', icon: 'fa-arrows-v', active: false },
      { id: 'textTransformation', title: 'Transformation', icon: 'fa-text-width', active: false },
      { id: 'opacity', title: 'Opacity', icon: 'fa-x-opacity', active: false },
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
      { id: 'rotate', title: 'Rotation', icon: 'fa-x-rotation', active: false }
    ],
    image: [
      { id: 'position', title: 'Position', icon: 'fa-x-position', active: false },
      { id: 'edit', title: 'Edit', icon: 'fa-x-edit', active: false },
      { id: 'dimension', title: 'Dimension', icon: 'fa-x-dimension', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'opacity', title: 'opacity', icon: 'fa-x-opacity', active: false },
      { id: 'origin', title: 'Origin', icon: 'fa-x-origin', active: false },
      { id: 'rotate', title: 'rotate', icon: 'fa-x-rotation', active: false },
      { id: 'url', title: 'URL', icon: 'fa-link', active: false },
      { id: 'control', title: 'Control', icon: 'fa-x-control', active: false },
    ]

  }

  fontFamilies: { family: string; variables: string[]; names: string[]; }[] = []
  postDetailsForm: FormGroup | undefined = undefined;
  imgParam: any;
  postDetails: PostDetails = {
    "id": null,
    "deleted": false,
    "download_counter": 0,
    "h": 1024,
    "w": 1024,
    "title": "image",
    "info": "",
    "info_show": true,
    "backgroundurl": "https://images.unsplash.com/photo-1536663094815-aa7e99627504?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "data": [
      {
        "title": "Text 1",
        "editable": true,
        "boxed": true,
        "text": {
          "x": 706,
          "y": 955,
          "fs": 40,
          "fw": "normal",
          "text": "Sample Text",
          "type": "text",
          "color": "#FFFFFF",
          "fontStyle": {
            "italic": false,
            "underline": false
          },
          "rotate": 0,
          "fontFamily": "Noto Sans Gujarati",
          "textShadow": {
            "enable": false,
            "color": "#FFFFFF",
            "blur": 0,
            "offsetX": 0,
            "offsetY": 0
          },
          "backgroundColor": "#FFFFFF",
          "textEffects": {
            "enable": false,
            "gradient": {
              "enable": false,
              "startColor": "#ffffff",
              "endColor": "#000000",
              "direction": "horizontal"
            },
            "outline": {
              "enable": false,
              "color": "#FFFFFF",
              "width": 2
            },
            "glow": {
              "enable": false,
              "color": "#ffffff",
              "blur": 0
            }
          },
          "textAnchor": "start",
          "alignmentBaseline": "start",
          "letterSpacing": 0,
          "lineHeight": 1.5,
          "textTransformation": "none",
          "opacity": 100,
          "originX": 0,
          "originY": 0
        }
      }
    ]
  }
  confirmDelete: any;
  apiData: { [key: string]: any[] } = {};
  selectData: { [key: string]: { title: string, control: FormControl, api: string, dependency: string, lang: string } } = {};
  positionShuffle: boolean = false;
  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private route: ActivatedRoute,
    private PS: PostDetailService,
    private fontService: FontService,
    private router: Router,
    private http: HttpClient,
    private toastService: ToastService
  ) {
    this.route.queryParams.subscribe(params => {
      this.imgParam = params['img'];
    });
    this.fontFamilies = this.fontService.fontFamilies
  }
  async getColors(image: string, colorCounts: number) {
    try {
      this.colorSet = await this.colorService.getColors(image, colorCounts);
    } catch (error) {
      console.error("Error updating colors:", error);
    }
  }
  getColorClass(isActive: boolean): string {
    if (isActive) {
      return '';
    } else {
      return 'shadow border border-light border-3';
    }
  }
  updateColor(event: any, control: any) {
    const value = (event.target as HTMLInputElement).value;
    control?.setValue(value);
  }
  updateValue(d: { data: Data, index: number }) {
    const value = this.postDetailsForm?.get('data') as FormArray | null;
    if (value) {
      const t = value.at(d.index) as FormControl | null;
      if (t) {
        const newData = d.data;
        if (newData.text) {
          if (newData.text.x) {
            t.get('text')?.get('x')?.patchValue(newData.text.x, { emitEvent: false });
          }
          if (newData.text.y) {
            t.get('text')?.get('y')?.patchValue(newData.text.y, { emitEvent: false });
          }
        }
        if (newData.image) {
          if (newData.image.x) {
            t.get('image')?.get('x')?.patchValue(newData.image.x, { emitEvent: false });
          }
          if (newData.image.y) {
            t.get('image')?.get('y')?.patchValue(newData.image.y, { emitEvent: false });
          }
        }
        if (newData.rect) {
          if (newData.rect.x) {
            t.get('rect')?.get('x')?.patchValue(newData.rect.x, { emitEvent: false });
          }
          if (newData.rect.y) {
            t.get('rect')?.get('y')?.patchValue(newData.rect.y, { emitEvent: false });
          }
        }
        if (newData.circle) {
          if (newData.circle.cx) {
            t.get('circle')?.get('cx')?.patchValue(newData.circle.cx, { emitEvent: false });
          }
          if (newData.circle.cy) {
            t.get('circle')?.get('cy')?.patchValue(newData.circle.cy, { emitEvent: false });
          }
        }
        if (newData.ellipse) {
          if (newData.ellipse.cx) {
            t.get('ellipse')?.get('cx')?.patchValue(newData.ellipse.cx, { emitEvent: false });
          }
          if (newData.ellipse.cy) {
            t.get('ellipse')?.get('cy')?.patchValue(newData.ellipse.cy, { emitEvent: false });
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
    this.selectedElement = d.index;
  }

  getPostById(postId: any): void {
    this.PS.getPostById(postId)
      .subscribe(
        post => {
          if (post) {
            this.postDetails = post;
            this.initForm();
          } else {
          }
        },
        error => {
          console.error('Error fetching post:', error);
        }
      );
  }

  initForm() {
    this.postDetailsForm = this.fb.group({
      id: [this.postDetails.id],
      deleted: [this.postDetails.deleted, Validators.required],
      h: [this.postDetails.h, Validators.required],
      w: [this.postDetails.w, Validators.required],
      title: [this.postDetails.title, Validators.required],
      backgroundurl: [this.postDetails.backgroundurl, Validators.required],
      download_counter: [this.postDetails.download_counter, Validators.required],
      info: [this.postDetails.info || '', Validators.required],
      info_show: [this.postDetails.info_show || false, Validators.required],
      data: this.fb.array([]),
      apiData: this.apiData
    });
    this.postDetailsForm?.get('backgroundurl')?.valueChanges.subscribe(async (v) => {
      this.postDetails.backgroundurl = v;
      await this.getColors(v, 20);
    });
    this.postDetailsForm.valueChanges.subscribe(async (v) => {
      this.postDetails = v;
    });
    this.getColors(this.postDetails.backgroundurl, 10);
    this.postDetails.data.forEach((d) => {
      d.rect && this.addData('rect', d);
      d.circle && this.addData('circle', d);
      d.ellipse && this.addData('ellipse', d);
      d.line && this.addData('line', d);
      d.text && this.addData('text', d);
      d.image && this.addData('image', d);
    })
    this.rebuild(this.postDetails.data)
  }
  get dataArray() {
    return this.postDetailsForm?.get('data') as FormArray;
  }
  addData(t: string, value?: Data) {
    let d: FormGroup = this.fb.group({})
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
      this.toastService.show(d.get('title')?.value + " is deleted successfully.", { class: 'bg-success' });
    } else {
      this.toastService.show(canDelete.join(', ') + (canDelete.length > 1 ? " are" : ' is') + " depend on " + d.get('title')?.value + ".", { title: d.get('title')?.value + " can't be deleted.", class: 'bg-danger' });
    }
  }
  private checkDependency(controlName: string, index: number): string[] {

    const hasDependency: string[] = [];
    this.dataArray.controls.some((control, i) => {
      if (i !== index) {
        const cn = control.get('text')?.get('dependency')?.value;

        if (cn === controlName) {
          hasDependency.push(control.get('title')?.value)
        }
        return cn === controlName;
      }
      return false;
    });

    return hasDependency;
  }

  rectData = {
    title: "Rect",
    editable: false,
    boxed: true,
    rect: {
      x: 30,
      y: 30,
      width: 100,
      height: 50,
      fill: "#FFFFFF",
      opacity: 0.8,
      originX: 5,
      originY: 5,
      rotate: 0,
    }
  };
  createRectFormGroup(r: Data): FormGroup {
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
        strokeAlignment: [r.rect?.strokeAlignment || 'center', Validators.required],
        fillOpacity: [r.rect?.fillOpacity || 1, Validators.required],
        strokeOpacity: [r.rect?.strokeOpacity || 1, Validators.required],
      })
    });
  }

  circleData = {
    title: "Circle 1",
    editable: false,
    boxed: true,
    circle: {
      cx: 50,
      cy: 50,
      r: 30,
      fill: "#FFFFFF",
      opacity: 1,
      originX: 0,
      originY: 0
    }
  };

  createCircleFormGroup(c: Data): FormGroup {
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
        strokeAlignment: [c.circle?.strokeAlignment || 'center', Validators.required],
      })
    })
  }
  ellipseData = {
    title: "Ellipse 1",
    editable: false,
    boxed: true,
    ellipse: {
      cx: 100,
      cy: 100,
      rx: 50,
      ry: 30,
      fill: "green",
      opacity: 0.8,
      originX: 0,
      originY: 0,
      rotate: 0
    }
  };
  createEllipseFormGroup(e: Data): FormGroup {
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
        strokeAlignment: [e.ellipse?.strokeAlignment || 'center', Validators.required] // Added strokeAlignment with default 'center'
      })
    });
  }

  lineData = {
    title: "Line 1",
    editable: false,
    boxed: true,
    line: {
      x1: 50,
      y1: 50,
      x2: 150,
      y2: 150,
      stroke: "black",
      strokeWidth: 2,
      opacity: 1,
      originX: 0,
      originY: 0,
      rotate: 0
    }
  };

  createLineFormGroup(l: Data): FormGroup {
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
        rotate: [l.line?.rotate, Validators.required]
      })
    });
  }
  textData: { title: string, editable: boolean, boxed: boolean, text: TextElement } = {
    title: "Text 1",
    editable: true,
    boxed: true,
    text: {
      x: 100,
      y: 100,
      fs: 40,
      fw: "normal",
      text: "Sample Text",
      type: 'text',
      color: "#FFFFFF",
      fontStyle: {
        italic: false,
        underline: false
      },
      rotate: 0,
      fontFamily: "Noto Sans Gujarati",
      textShadow: {
        enable: false,
        color: "#FFFFFF",
        blur: 0,
        offsetX: 0,
        offsetY: 0
      },
      backgroundColor: "#FFFFFF",
      textEffects: {
        enable: false,
        gradient: {
          enable: false,
          startColor: "#ffffff",
          endColor: "#000000",
          direction: "horizontal"
        },
        outline: {
          enable: false,
          color: "#FFFFFF",
          width: 2
        },
        glow: {
          enable: false,
          color: "#ffffff",
          blur: 0
        }
      },
      textAnchor: "start",
      alignmentBaseline: 'middle',
      letterSpacing: 0,
      lineHeight: 1.5,
      textTransformation: "none",
      opacity: 100,
      originX: 0,
      originY: 0
    }
  };
  createTextFormGroup(t: Data): FormGroup {
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
          underline: [t.text?.fontStyle.underline, Validators.required]
        }),
        rotate: [t.text?.rotate, Validators.required],
        fontFamily: [t.text?.fontFamily, Validators.required],
        textShadow: this.fb.group({
          enable: [t.text?.textShadow.enable],
          color: [t.text?.textShadow.color],
          blur: [t.text?.textShadow.blur],
          offsetX: [t.text?.textShadow.offsetX],
          offsetY: [t.text?.textShadow.offsetY]
        }),
        backgroundColor: [t.text?.backgroundColor, Validators.required],
        textEffects: this.fb.group({
          enable: [false],
          gradient: this.fb.group({
            enable: [false],
            startColor: [t.text?.textEffects.gradient.startColor, Validators.required],
            endColor: [t.text?.textEffects.gradient.endColor, Validators.required],
            direction: [t.text?.textEffects.gradient.direction, Validators.required]
          }),
          outline: this.fb.group({
            enable: [false],
            color: [t.text?.textEffects.outline.color, Validators.required],
            width: [t.text?.textEffects.outline.width, Validators.required]
          }),
          glow: this.fb.group({
            enable: [false],
            color: [t.text?.textEffects.glow.color, Validators.required],
            blur: [t.text?.textEffects.glow.blur, Validators.required]
          })
        }),
        textAnchor: [t.text?.textAnchor],
        alignmentBaseline: [t.text?.textAnchor],
        letterSpacing: [t.text?.letterSpacing, Validators.required],
        lineHeight: [t.text?.lineHeight, Validators.required],
        textTransformation: [t.text?.textTransformation, Validators.required],
        opacity: [t.text?.opacity, Validators.required],
        originX: [t.text?.originX],
        originY: [t.text?.originY]
      })
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
    await this.http.get<any[]>(apiUrl).subscribe({
      next: data => {
        this.apiData[controlName] = data;
      },
      error: () => {

      }
    });
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
    return this.selectData[key];
  }
  dependencyList(key: string): { title: string, value: string }[] {
    const result: { title: string, value: string }[] = [];
    for (const k in this.selectData) {
      if (k !== key) {
        result.push({ title: this.selectData[k].title, value: k });
      }
    }
    console.log(result)
    return result;
  }
  private addSelectControls(textForm: FormGroup, textFormGroup: FormGroup, t: Data, cn: string) {
    this.selectData[cn] = {
      title: textForm.get('title')?.value || '',
      control: textFormGroup.get('text') as FormControl,
      api: t.text?.api as string,
      dependency: t.text?.dependency || 'none',
      lang: t.text?.lang || 'en'
    };
    if (!textFormGroup.contains('lang')) {
      textFormGroup.addControl('lang', new FormControl(t.text?.lang, Validators.required));
    }
    if (!textFormGroup.contains('controlName')) {
      textFormGroup.addControl('controlName', new FormControl(t.text?.controlName || cn, Validators.required));
    }
    if (!textFormGroup.contains('dependency')) {
      textFormGroup.addControl('dependency', new FormControl(t.text?.dependency || 'none', Validators.required));
    }
    if (!textFormGroup.contains('api')) {
      textFormGroup.addControl('api', new FormControl(t.text?.api, Validators.required));
    }
  }
  private removeSelectControls(textFormGroup: FormGroup) {
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
  updateFontWeights(c: AbstractControl<any, any>) {
    let selectedFontFamily = c.value;
    const parentFormGroup = c.parent;
    const f = this.fontFamilies.find(family => family.family === selectedFontFamily);
    if (!f) {
      selectedFontFamily = ('Noto Sans Gujarati')
    }
    if (selectedFontFamily && parentFormGroup) {
      const font = this.fontFamilies.find(f => f.family === selectedFontFamily);
      const fontWeights = font ? font.variables : [];
      const currentValue = parentFormGroup.get('fw')?.value;
      if (!fontWeights.includes(currentValue)) {
        parentFormGroup.get('fw')?.patchValue(fontWeights[0] || '400');
      }
    }
  }
  getWeight(c: AbstractControl<any, any>) {
    const selectedFontFamily = c.value;
    const f = this.fontFamilies.find(family => family.family === selectedFontFamily);
    if (f) {
      return f.variables;
    } else {
      return []
    }
  }
  createSvgPropertiesFormGroup(svg: SvgProperties): FormGroup {
    return this.fb.group({
      fill: [svg.fill, Validators.required],
      stroke: [svg.stroke, Validators.required],
      strokeWidth: [svg.strokeWidth, Validators.required]
    });
  }
  imageData = {
    title: "Image 1",
    editable: true,
    boxed: true,
    image: {
      r: 50,
      x: 100,
      y: 100,
      imageUrl: "assets/images/svg/upload-img.svg",
      borderColor: "#000000",
      borderWidth: 2,
      shape: "circle",
      origin: "center",
      placeholder: "Placeholder Text",
      svgProperties: {
        fill: "#ffffff",
        stroke: "#000000",
        strokeWidth: 2
      },
      rotate: 0
    }
  };
  createImageFormGroup(i: Data): FormGroup {
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
        svgProperties: this.createSvgPropertiesFormGroup(i.image?.svgProperties!),
        rotate: [i.image?.rotate]
      })
    });
  }
  async drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.postDetails.data, event.previousIndex, event.currentIndex);
    this.positionShuffle = true;
    await this.rebuild(this.postDetails.data);
    this.positionShuffle = false;
  }
  setActiveControl(rectIndex: number, controlIndex: number) {
    this.controlSet[rectIndex].forEach((control, index) => {
      control.active = index === controlIndex;
    });
    this.controlSet.forEach((controls, i) => {
      controls.forEach((control, index) => {
        if (control.active) {
          this.activeControlIndex = index;
        }
      });
    });
  }
  getActiveControl(rectIndex: number, controlId: string): boolean {
    const controls = this.controlSet[rectIndex];
    const activeControl = controls.find(control => control.id === controlId && control.active);
    return activeControl ? true : false;
  }
  toggleExpand(event: Event) {
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
    this.dataArray.clear();
    this.controlSet = [];
    for (let i = 0; i < dataArray.length; i++) {
      const item = dataArray[i];
      (item.rect) && this.dataArray.push(this.createRectFormGroup(item));
      (item.rect) && this.controlSet.push(this.controlValues.rect);
      (item.circle) && this.dataArray.push(this.createCircleFormGroup(item));
      (item.circle) && this.controlSet.push(this.controlValues.circle);
      (item.ellipse) && this.dataArray.push(this.createEllipseFormGroup(item));
      (item.ellipse) && this.controlSet.push(this.controlValues.ellipse);
      (item.line) && this.dataArray.push(this.createLineFormGroup(item));
      (item.line) && this.controlSet.push(this.controlValues.line);
      (item.text) && this.dataArray.push(this.createTextFormGroup(item));
      (item.text) && this.controlSet.push(this.controlValues.text);
      (item.image) && this.dataArray.push(this.createImageFormGroup(item));
      (item.image) && this.controlSet.push(this.controlValues.image);
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
    if (!this.apiData[key]) {
      this.fetchDataFromAPI(api, key);
    }
  }
  private setupDependency(key: string, data: { title: string, control: FormControl, api: string, dependency: string }) {
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
      data.control.setValue(data.title, { emitEvent: true })
    });
  }
  
  onSubmit(clone?: boolean) {
    if (this.postDetailsForm?.valid) {
      const formData = this.postDetailsForm?.value;
      console.log(formData);
      if (clone) {
        formData.id = null;
        formData.download_counter = 0;
      };
      if (formData.id === null) {
        const { id, ...formDataWithoutId } = formData;
        this.addPost(formDataWithoutId);
      } else {
        this.updatePost(formData);
      }
    } else {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.postDetailsForm?.markAllAsTouched();
    }
  }
  addPost(newPostData: PostDetails): void {
    this.PS.addPost(newPostData)
      .subscribe(
        (response: PostDetails) => {
          const addedDataId = response.id;
          console.log('Added data ID:', addedDataId);
          this.postDetailsForm?.get('id')?.setValue(addedDataId);
          this.postDetails.id = addedDataId;
          this.router.navigate([], { queryParams: { img: addedDataId }, queryParamsHandling: 'merge' });
        },
        error => {
          console.error(error); // Handle error appropriately
        }
      );
  }

  updatePost(newData: PostDetails): void {
    this.PS.updatePost(newData)
      .subscribe(response => {

      }, error => {
        console.error(error); // Handle error appropriately
      });
  }
  softDelete(): void {
    const id = this.postDetailsForm?.get('id')?.value;
    id && this.PS.softDeletePost(id)
      .subscribe(
        response => {
          console.log('Soft deletion successful:', response);
          this.confirmDelete.hide();
          window.close();
        },
        error => {
          console.error('Error during soft deletion:', error);
        }
      );
  }

  hardDelete(): void {
    const id = this.postDetailsForm?.get('id')?.value;
    id && this.PS.hardDeletePost(id)
      .subscribe(
        response => {
          console.log('Hard deletion successful:', response);
        },
        error => {
          console.error('Error during hard deletion:', error);
        }
      );
  }
  onScroll(event: any) {
    const element = event.target;
    // Synchronize the horizontal scroll position with the vertical scroll position
    element.scrollLeft = element.scrollLeft;
  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.confirmDelete = new bootstrap.Modal(document.getElementById('confirmDelete')!, { focus: false, keyboard: false, static: false });
    this.confirmDelete._element.addEventListener('hide.bs.modal', () => {
    });
    this.confirmDelete._element.addEventListener('show.bs.modal', () => {
    });
    this.confirmDelete._element.addEventListener('shown.bs.modal', () => {
    });
    this.imgParam && this.getPostById(this.imgParam);
    !this.imgParam && this.initForm();
  }
}
