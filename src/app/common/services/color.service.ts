import { Injectable } from '@angular/core';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  async getColors(image: string, colorCounts: number): Promise<string[]> {
    try {
      const colorThief = new ColorThief();
      const img = new Image();
      img.src = image;
      img.crossOrigin = "Anonymous";

      return new Promise((resolve, reject) => {
        img.onload = () => {
          const dominantColors = colorThief.getPalette(img, colorCounts);
          const colorSet = dominantColors.map((rgb: number[]) => this.rgbToHex(rgb[0], rgb[1], rgb[2]));
          colorSet.unshift('#000000', '#FFFFFF');
          resolve(colorSet);
        };

        img.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.error("Error getting colors:", error);
      throw error;
    }
  }
  async getColorsFromImageElement(imgElement: HTMLImageElement, colorCounts: number): Promise<string[]> {
    try {
      if (!imgElement.complete) {
        await this.waitForImageLoad(imgElement);
      }
      imgElement.crossOrigin = "Anonymous";
      const colorThief = new ColorThief();
      const dominantColors = colorThief.getPalette(imgElement, colorCounts);
      const colorSet = dominantColors.map((rgb: number[]) => this.rgbToHex(rgb[0], rgb[1], rgb[2]));
      colorSet.unshift('#000000', '#FFFFFF'); // Ensure black and white are included
      return colorSet;

    } catch (error) {
      console.error("Error getting colors:", error);
      throw error;
    }
  }

  private waitForImageLoad(imgElement: HTMLImageElement): Promise<void> {
    return new Promise((resolve, reject) => {
      if (imgElement.complete) {
        resolve();
      } else {
        imgElement.onload = () => resolve();
        imgElement.onerror = reject;
      }
    });
  }
  rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
