import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getDisplayName } from 'src/app/common/helpers/display-name.helper';
import {
  CircleProperties,
  EllipseProperties,
  ImageElement,
  LineProperties,
  PostDetails,
  RectProperties,
  SvgProperties,
  TextElement,
} from 'src/app/common/interfaces/image-element';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ColorService } from 'src/app/common/services/color.service';
import { UserPublicInfo } from 'src/app/graphql/types/login.types';
declare const bootstrap: any;

interface SizeEntry {
  type: string;
  width: number;
  height: number;
}

interface Size {
  platform: string;
  entries: SizeEntry[];
}
interface ToolbarItem {
  key: string;
  label: string;
  icon: string;
  isPremium?: boolean;
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
  selector: 'app-frame-management',
  templateUrl: './frame-management.component.html',
  styleUrl: './frame-management.component.scss',
})
export class FrameManagementComponent {
  user: UserPublicInfo;
  fullName: string;
  sizes: Size[] = [
    {
      platform: 'Instagram',
      entries: [
        { type: 'square post', width: 1080, height: 1080 },
        { type: 'story', width: 1080, height: 1920 },
        { type: 'reel', width: 1080, height: 1920 },
        { type: 'carousel', width: 1080, height: 1080 },
        { type: 'story ad', width: 1080, height: 1920 },
        { type: 'feed ad', width: 1080, height: 1350 },
        { type: 'portrait post', width: 1080, height: 1350 },
        { type: 'landscape post', width: 1080, height: 566 },
      ],
    },
    {
      platform: 'Facebook',
      entries: [
        { type: 'post', width: 1080, height: 1080 },
        { type: 'story', width: 1080, height: 1920 },
        { type: 'feed ad', width: 1080, height: 1080 },
        { type: 'profile cover', width: 851, height: 315 },
        { type: 'event cover', width: 1200, height: 630 },
        { type: 'page cover', width: 820, height: 312 },
        { type: 'group cover', width: 1640, height: 856 },
      ],
    },
    {
      platform: 'Google Ads',
      entries: [
        { type: 'landscape image', width: 1200, height: 628 },
        { type: 'square image', width: 1200, height: 1200 },
        { type: 'portrait image', width: 960, height: 1200 },
        { type: 'landscape video', width: 1920, height: 1080 },
        { type: 'square video', width: 1080, height: 1080 },
        { type: 'portrait video', width: 1080, height: 1920 },
        { type: 'landscape logo', width: 1200, height: 300 },
      ],
    },
    {
      platform: 'YouTube',
      entries: [
        { type: 'video', width: 1920, height: 1080 },
        { type: 'thumbnail', width: 1280, height: 720 },
        { type: 'shorts', width: 1080, height: 1920 },
        { type: 'banner', width: 2560, height: 1440 },
        { type: 'profile photo', width: 800, height: 800 },
        { type: 'display ad', width: 300, height: 60 },
        { type: 'video ad', width: 1920, height: 1080 },
      ],
    },
    {
      platform: 'Twitter (X)',
      entries: [
        { type: 'post', width: 1200, height: 675 },
        { type: 'video', width: 1920, height: 1080 },
        { type: 'header', width: 1500, height: 500 },
      ],
    },
    {
      platform: 'Pinterest',
      entries: [
        { type: 'post', width: 1000, height: 1500 },
        { type: 'idea pin', width: 1080, height: 1920 },
        { type: 'square', width: 600, height: 600 },
        { type: 'vertical post', width: 600, height: 900 },
      ],
    },
    {
      platform: 'Other',
      entries: [
        { type: 'Snapchat ad', width: 1080, height: 1920 },
        { type: 'Meme', width: 1200, height: 1200 },
        { type: 'Twitch banner', width: 1200, height: 480 },
        { type: 'Twitch overlay', width: 1920, height: 1080 },
        { type: 'Tumblr banner', width: 3000, height: 1055 },
        { type: 'Reddit cover', width: 1920, height: 256 },
        { type: 'SoundCloud banner', width: 2480, height: 520 },
        { type: 'Snapchat filter', width: 1080, height: 1920 },
        { type: 'note header image', width: 1280, height: 670 },
        { type: 'WhatsApp icon', width: 800, height: 800 },
        { type: 'WhatsApp status', width: 1080, height: 1920 },
        { type: 'WhatsApp post', width: 1080, height: 1440 },
      ],
    },
  ];
  selectedPlatformIndex = 0;
  selectedDimension: SizeEntry = this.sizes[0].entries[0];
  originalDimension: SizeEntry = { ...this.selectedDimension };
  @ViewChild('mainSVG', { static: true }) mainSVG!: ElementRef<SVGElement>;
  toolbarItems: ToolbarItem[] = [
    {
      key: 'dimension',
      label: 'Dimension',
      icon: 'aspect_ratio',
      isPremium: true,
    },
    { key: 'theme', label: 'Theme', icon: 'palette' },
    { key: 'replace', label: 'Replace', icon: 'sync' },
    { key: 'language', label: 'Language', icon: 'language' },
  ];
  constructor(
    private authService: AuthenticationService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private fb: FormBuilder,
    private colorService: ColorService,
    private http: HttpClient
  ) {}
  async ngOnInit(): Promise<void> {
    this.initForm()
    const user = await this.authService.getUser();
    if (user) {
      this.user = user;
      this.selectedDimension = this.sizes[0].entries[0];
      this.fullName = getDisplayName(user);
      this.applyDimension();
      this.initForm()
    } else {
      return;
    }
  }
  ngAfterViewInit(): void {}
  selectTab(index: number): void {
    this.selectedPlatformIndex = index;
  }
  selectedTool: string | null = null;

  // “which index is live?” — this drives mat-tab-group
  selectedIndex: number | null = null;

  /** Called when user clicks on a tab */
  onTabChange(index: number) {
    // if they clicked the already‐active tab → toggle it off
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
      this.selectedTool = null;
    } else {
      this.selectedIndex = index;
      this.selectedTool = this.toolbarItems[index].key;
    }
  }

  isSelected(dim: SizeEntry): boolean {
    return (
      dim.type === this.selectedDimension.type &&
      dim.width === this.selectedDimension.width &&
      dim.height === this.selectedDimension.height
    );
  }

  get dimensionChanged(): boolean {
    return (
      this.selectedDimension.width !== this.originalDimension.width ||
      this.selectedDimension.height !== this.originalDimension.height
    );
  }

  applyDimension(): void {
    this.originalDimension = { ...this.selectedDimension };

    if (this.mainSVG?.nativeElement) {
      this.renderer.setAttribute(
        this.mainSVG.nativeElement,
        'viewBox',
        `0 0 ${this.selectedDimension.width} ${this.selectedDimension.height}`
      );
    }

    const modalElement = document.getElementById('dimensionModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide();
    }
  }
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
  selectedElement: number | null = null;
  postDetailsForm: FormGroup | undefined = undefined;
  apiData: { [key: string]: any[] } = {};
  colorSet: string[] = [];
  selectData: {
    [key: string]: {
      title: string;
      control: FormControl;
      api: string;
      dependency: string;
      lang: string;
    };
  } = {};

  controlSet: ShapeControl[][] = [];
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
      { id: 'edit', title: 'Edit', icon: 'fa-x-edit', active: false },
      { id: 'fill', title: 'Fill', icon: 'fa-x-fill', active: false },
      { id: 'fontSize', title: 'Size', icon: 'fa-x-font-size', active: false },
      { id: 'fontStyle', title: 'Style', icon: 'fa-italic', active: false },
      {
        id: 'textAlign',
        title: 'Alignment',
        icon: 'fa-align-left',
        active: false,
      },
      { id: 'fontFamily', title: 'Font', icon: 'fa-font', active: false },
      { id: 'fontWeight', title: 'Weight', icon: 'fa-bold', active: false },
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
        id: 'letterSpacing',
        title: 'Spacing',
        icon: 'fa-arrows-h',
        active: false,
      },
      {
        id: 'lineHeight',
        title: 'Line Height',
        icon: 'fa-arrows-v',
        active: false,
      },
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
  positionShuffle: boolean = false;
  async getColors(image: string, colorCounts: number) {
    try {
      this.colorSet = await this.colorService.getColors(image, colorCounts);
    } catch (error) {
      console.error('Error updating colors:', error);
    }
  }
  addData(t: string, value?: Data) {
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
  get dataArray() {
    return this.postDetailsForm?.get('data') as FormArray;
  }
  initForm() {
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
    this.getColors(this.postDetails.backgroundurl, 10);
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
  createSvgPropertiesFormGroup(svg: SvgProperties): FormGroup {
    return this.fb.group({
      fill: [svg.fill, Validators.required],
      stroke: [svg.stroke, Validators.required],
      strokeWidth: [svg.strokeWidth, Validators.required],
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
  async fetchDataFromAPI(apiUrl: string, controlName: string): Promise<void> {
    await this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.apiData[controlName] = data['data'] || data;
        console.log(this.apiData[controlName]);
      },
      error: () => {},
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
  private addSelectControls(
    textForm: FormGroup,
    textFormGroup: FormGroup,
    t: Data,
    cn: string
  ) {
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
  async rebuild(dataArray: Data[]) {
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
  private loadData(key: string, api: string) {
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
}
