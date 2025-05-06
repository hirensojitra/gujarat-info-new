// src/app/graphql/types/post-detail.types.ts

/** Enums */
export type StrokeAlignment   = 'inside' | 'outside' | 'center';
export type TextElementType   = 'text' | 'select' | 'textarea' | 'date';

/** Pagination info */
export interface Pagination {
  currentPage: number;
  totalPages:  number;
  totalPosts:  number;
}

/** Wrapper for list responses */
export interface PostListResponse {
  posts:      PostDetails[];
  pagination: Pagination;
}

/** Primitive vector shapes */
export interface RectProperties {
  x: number; y: number; width: number; height: number;
  rx?: number; ry?: number;
  fill: string; fillOpacity?: number; opacity: number;
  rotate?: number; originX?: number; originY?: number;
  stroke: string; strokeOpacity?: number; strokeWidth?: number;
  strokeAlignment?: StrokeAlignment;
}

export interface CircleProperties {
  cx: number; cy: number; r: number;
  fill: string; fillOpacity?: number; opacity: number;
  originX?: number; originY?: number;
  stroke?: string; strokeWidth?: number; strokeOpacity?: number;
  strokeAlignment?: StrokeAlignment;
}

export interface EllipseProperties {
  cx: number; cy: number; rx: number; ry: number;
  fill: string; fillOpacity?: number; opacity: number;
  originX?: number; originY?: number; rotate?: number;
  stroke?: string; strokeWidth?: number; strokeOpacity?: number;
  strokeAlignment?: StrokeAlignment;
}

export interface LineProperties {
  x1: number; y1: number; x2: number; y2: number;
  stroke: string; strokeWidth: number; opacity: number;
  originX?: number; originY?: number; rotate?: number;
}

/** Text styling */
export interface TextShadow {
  enable: boolean;
  color:  string;
  blur:   number;
  offsetX:number;
  offsetY:number;
}

export interface Gradient {
  enable:     boolean;
  startColor: string;
  endColor:   string;
  direction:  string;
}

export interface Outline {
  enable: boolean;
  color:  string;
  width:  number;
}

export interface Glow {
  enable: boolean;
  color:  string;
  blur:   number;
}

export interface TextEffects {
  enable:      boolean;
  gradient:    Gradient;
  outline:     Outline;
  glow:        Glow;
}

export interface FontStyle {
  italic:    boolean;
  underline: boolean;
}

/** Rich‐text element */
export interface TextElement {
  x:                  number;
  y:                  number;
  fs:                 number;
  fw:                 string;
  text:               string;
  api?:               string | null;
  lang?:              string | null;
  controlName?:       string | null;
  dependency?:        string | null;
  type:               TextElementType;
  color:              string;
  fontStyle:          FontStyle;
  rotate:             number;
  fontFamily:         string;
  textShadow:         TextShadow;
  backgroundColor:    string;
  textEffects:        TextEffects;
  textAnchor:         string;
  alignmentBaseline:  string;
  letterSpacing:      number;
  lineHeight:         number;
  textTransformation: string;
  opacity:            number;
  originX:            number;
  originY:            number;
}

/** SVG wrapper */
export interface SvgProperties {
  fill:        string;
  stroke:      string;
  strokeWidth: number;
}

export interface ImageElement {
  r:           number;
  x:           number;
  y:           number;
  imageUrl:    string;
  borderColor: string;
  borderWidth: number;
  shape:       string;
  origin:      string;
  placeholder: string;
  svgProperties: SvgProperties;
  rotate:      number;
}

/** One entry in a post’s data array */
export interface DataElement {
  title:    string;
  editable: boolean;
  boxed:    boolean;
  rect?:        RectProperties;
  circle?:      CircleProperties;
  ellipse?:     EllipseProperties;
  line?:        LineProperties;
  text?:        TextElement;
  image?:       ImageElement;
}

/** Core post type */
export interface PostDetails {
  id:                string;
  deleted:           boolean;
  info:              string;
  info_show:         boolean;
  h:                 number;
  w:                 number;
  title:             string;
  backgroundurl:     string;
  download_counter:  number;
  data:              DataElement[];
  msg?:              string | null;
  apiData?:          any;
  image?:            string | null;
  published:         boolean;
  track:             boolean;
  created_at?:       string | null;
  updated_at?:       string | null;
  deleted_at?:       string | null;
}

/** ===== Input types for mutations ===== */

export interface RectPropertiesInput extends Omit<RectProperties, 'opacity'> {
  opacity: number;
}

export interface CirclePropertiesInput extends Omit<CircleProperties, 'opacity'> {
  opacity: number;
}

export interface EllipsePropertiesInput extends Omit<EllipseProperties, 'opacity'> {
  opacity: number;
}

export interface LinePropertiesInput extends LineProperties {}

export interface TextShadowInput extends TextShadow {}
export interface GradientInput extends Gradient {}
export interface OutlineInput extends Outline {}
export interface GlowInput extends Glow {}
export interface TextEffectsInput extends TextEffects {}
export interface FontStyleInput extends FontStyle {}
export interface TextElementInput extends TextElement {}
export interface SvgPropertiesInput extends SvgProperties {}
export interface ImageElementInput extends ImageElement {}

export interface DataElementInput {
  title:    string;
  editable: boolean;
  boxed:    boolean;
  rect?:    RectPropertiesInput;
  circle?:  CirclePropertiesInput;
  ellipse?: EllipsePropertiesInput;
  line?:    LinePropertiesInput;
  text?:    TextElementInput;
  image?:   ImageElementInput;
}

export interface PostInput {
  h:                 number;
  w:                 number;
  title:             string;
  info:              string;
  info_show:         boolean;
  backgroundurl:     string;
  data:              DataElementInput[];
  download_counter:  number;
  published:         boolean;
  track:             boolean;
}

export interface PostUpdateInput {
  id:                string;
  h?:                number;
  w?:                number;
  title?:            string;
  info?:             string;
  info_show?:        boolean;
  backgroundurl?:    string;
  data?:             DataElementInput[];
  download_counter?: number;
  published?:        boolean;
  track?:            boolean;
}
