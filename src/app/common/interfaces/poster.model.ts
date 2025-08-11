export interface PosterPage {
  id: string;
  name: string;
  thumbnail: string;
  canvas: any; // fabric.Canvas
  objects: any[];
  backgroundColor: string;
  width: number;
  height: number;
}

export interface PosterProject {
  id: string;
  name: string;
  pages: PosterPage[];
  currentPageId: string;
  createdAt: Date;
  updatedAt: Date;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export interface CanvasObject {
  id: string;
  type: 'text' | 'image' | 'shape' | 'background';
  name: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
  data: any;
}

export interface ColorPalette {
  name: string;
  colors: string[];
}

export interface ThemePreset {
  name: string;
  colors: string[];
  fonts: string[];
  category: 'bold' | 'classic' | 'professional';
}

export interface AnimationPreset {
  name: string;
  type: 'bloom' | 'glide' | 'popping';
  duration: number;
  easing: string;
}

export interface ResizePreset {
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'mm' | 'in';
}