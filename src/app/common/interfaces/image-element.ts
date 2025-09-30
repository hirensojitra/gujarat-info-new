export interface RectProperties {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  fill?: string;
  fillOpacity?: number;
  opacity?: number;
  rotate?: number;
  originX?: number;
  originY?: number;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  strokeAlignment?: 'inside' | 'outside' | 'center';
  editable?: boolean;
}

export interface CircleProperties {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  fillOpacity?: number;
  opacity: number;
  originX: number;
  originY: number;
  stroke?: number;
  strokeWidth?: number;
  strokeOpacity?: number;
  strokeAlignment?: 'inside' | 'outside' | 'center';
}

export interface EllipseProperties {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: string;
  fillOpacity?: number;
  opacity: number;
  originX: number;
  originY: number;
  rotate: number;
  stroke?: string;
  strokeWidth?: number;
  strokeAlignment?: string;
  strokeOpacity?: number;
}

export interface LineProperties {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  originX: number;
  originY: number;
  rotate: number;
}

export interface FontStyle {
  italic: boolean;
  underline: boolean;
}

export interface Gradient {
  enable: false;
  startColor: string;
  endColor: string;
  direction: string;
}

export interface TextShadow {
  enable: boolean;
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface TextEffects {
  enable: boolean;
  gradient: Gradient;
  outline: {
    enable: false;
    color: string;
    width: number;
    strokeDasharray: any;
    strokeLinejoin: string;
    strokeLinecap?: string;
  };
  glow: {
    enable: false;
    color: string;
    blur: number;
  };
}

export interface TextElement {
  // Positioning & Geometry Attributes
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  rotate?: number;
  textLength?: number;
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs';

  // Text & Layout Styling Attributes
  textAnchor?: 'start' | 'middle' | 'end';
  dominantBaseline?: 'auto' | 'middle' | 'hanging' | 'ideographic';
  alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical';
  baselineShift?: string; // Can be 'sub', 'super', or a length value
  direction?: 'ltr' | 'rtl';
  unicodeBidi?: 'normal' | 'embed' | 'bidi-override';
  writingMode?: 'horizontal-tb' | 'vertical-rl' | 'vertical-lr';
  letterSpacing?: number;
  wordSpacing?: number;
  kerning?: number;
  whiteSpace?: 'normal' | 'pre' | 'nowrap';

  // Paint & Font Attributes
  fill?: string;
  fillOpacity?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  fontFamily?: string;
  fs: number; // font-size
  fontSizeAdjust?: number;
  fontStretch?: 'normal' | 'condensed' | 'expanded' | 'extra-condensed' | 'extra-expanded' | 'semi-condensed' | 'semi-expanded' | 'ultra-condensed' | 'ultra-expanded';
  fontStyle: FontStyle;
  fontVariant?: 'normal' | 'small-caps';
  fw: string; // font-weight

  // Global & Core Attributes
  opacity?: number;
  visibility?: 'visible' | 'hidden' | 'collapse';
  
  // Other existing properties from original interface
  text?: string;
  api?: string;
  lang?: string;
  controlName?: string;
  dependency?: string;
  type: 'text' | 'select' | 'textarea' | 'date';
  color: string; // This will be mapped to fill
  textShadow: TextShadow;
  backgroundColor: string;
  textEffects: TextEffects;
  lineHeight: number;
  textTransformation: string;
  originX: number;
  originY: number;
}


export interface SvgProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface ImageElement {
  r: number;
  x: number;
  y: number;
  imageUrl: string;
  borderColor: string;
  borderWidth: number;
  shape: string;
  origin: string;
  placeholder: string;
  svgProperties: SvgProperties;
  rotate: number;
  editable?: boolean;
}

export interface PostDetails {
  id: string | null;
  deleted: boolean;
  info: string;
  info_show: boolean;
  h: number;
  w: number;
  title: string;
  backgroundurl: string;
  download_counter: number;
  data: {
    title: string;
    editable: boolean;
    boxed: boolean;
    rect?: RectProperties;
    circle?: CircleProperties;
    ellipse?: EllipseProperties;
    line?: LineProperties;
    text?: TextElement;
    image?: ImageElement;
  }[];
  msg?: string;
  apiData?: { [key: string]: any[] };
  image?: string;
  published: boolean;
  track: boolean;
  category?: PostCategory;
  subcategory?: PostSubcategory;
}

export interface PostCategory {
  id: string;
  name: string;
  description?: string;
  active?: boolean;
}

export interface PostSubcategory {
  id: string;
  name: string;
  description?: string;
  category_id: string;
  active?: boolean;
}

export interface AspectRatio {
  ratio: number;
  divisor: number;
}

export interface AspectRatios {
  [key: string]: AspectRatio;
}
