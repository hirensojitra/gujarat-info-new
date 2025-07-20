import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPalette } from 'src/app/common/interfaces/poster.model';
import { PosterService } from 'src/app/common/services/poster';

@Component({
  selector: 'app-color-picker-panel',
  templateUrl: './color-picker-panel.component.html',
  styleUrl: './color-picker-panel.component.scss'
})
export class ColorPickerPanelComponent {

  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() colorSelected = new EventEmitter<string>();

  colorPalettes: ColorPalette[] = [];
  selectedColor = '#ffffff';
  customColor = '#ffffff';
  selectedGradient = '';
  recentColors: string[] = [];

  // HSL values for custom color
  hue = 0;
  saturation = 0;
  lightness = 100;

  gradientPresets = [
    { name: 'Sunset', css: 'linear-gradient(135deg, #ff6b6b, #feca57)' },
    { name: 'Ocean', css: 'linear-gradient(135deg, #3742fa, #70a1ff)' },
    { name: 'Forest', css: 'linear-gradient(135deg, #2ed573, #1e90ff)' },
    { name: 'Purple', css: 'linear-gradient(135deg, #a55eea, #d63031)' },
    { name: 'Pink', css: 'linear-gradient(135deg, #fd79a8, #fdcb6e)' },
    { name: 'Blue', css: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
    { name: 'Green', css: 'linear-gradient(135deg, #00b894, #00cec9)' },
    { name: 'Orange', css: 'linear-gradient(135deg, #fdcb6e, #e17055)' }
  ];

  constructor(private posterService: PosterService) {
    this.colorPalettes = this.posterService.getColorPalettes();
    this.loadRecentColors();
  }

  selectColor(color: string): void {
    this.selectedColor = color;
    this.customColor = color;
    this.updateHSLFromColor(color);
    this.selectedGradient = '';
  }

  selectGradient(gradient: any): void {
    this.selectedGradient = gradient.name;
    this.selectedColor = gradient.css;
  }

  onCustomColorChange(): void {
    this.selectedColor = this.customColor;
    this.updateHSLFromColor(this.customColor);
    this.selectedGradient = '';
  }

  updateColorFromHSL(): void {
    this.customColor = this.hslToHex(this.hue, this.saturation, this.lightness);
    this.selectedColor = this.customColor;
    this.selectedGradient = '';
  }

  private updateHSLFromColor(color: string): void {
    const hsl = this.hexToHSL(color);
    this.hue = hsl.h;
    this.saturation = hsl.s;
    this.lightness = hsl.l;
  }

  private hexToHSL(hex: string): {h: number, s: number, l: number} {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  private hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private loadRecentColors(): void {
    const saved = localStorage.getItem('postergen_recent_colors');
    if (saved) {
      this.recentColors = JSON.parse(saved);
    }
  }

  private saveRecentColor(color: string): void {
    if (!this.recentColors.includes(color)) {
      this.recentColors.unshift(color);
      if (this.recentColors.length > 16) {
        this.recentColors.pop();
      }
      localStorage.setItem('postergen_recent_colors', JSON.stringify(this.recentColors));
    }
  }

  applyColor(): void {
    this.saveRecentColor(this.selectedColor);
    this.colorSelected.emit(this.selectedColor);
    this.close();
  }

  close(): void {
    this.closePanel.emit();
  }

}
