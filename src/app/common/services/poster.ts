import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PosterProject, PosterPage, CanvasObject, ColorPalette, ThemePreset, AnimationPreset, ResizePreset } from '../interfaces/poster.model';


@Injectable({
  providedIn: 'root'
})
export class PosterService {
  private currentProject = signal<PosterProject | null>(null);
  private currentPage = signal<PosterPage | null>(null);
  private selectedObjects = signal<CanvasObject[]>([]);
  private isDarkTheme = signal<boolean>(false);

  // Observables for reactive updates
  private projectSubject = new BehaviorSubject<PosterProject | null>(null);
  private pageSubject = new BehaviorSubject<PosterPage | null>(null);

  public project$ = this.projectSubject.asObservable();
  public page$ = this.pageSubject.asObservable();

  // Getters for signals
  getCurrentProject = this.currentProject.asReadonly();
  getCurrentPage = this.currentPage.asReadonly();
  getSelectedObjects = this.selectedObjects.asReadonly();
  getIsDarkTheme = this.isDarkTheme.asReadonly();

  // Color palettes
  getColorPalettes(): ColorPalette[] {
    return [
      {
        name: 'Brand Colors',
        colors: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0', '#607D8B']
      },
      {
        name: 'Pastel',
        colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E1BAFF']
      },
      {
        name: 'Earth Tones',
        colors: ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#BC8F8F']
      },
      {
        name: 'Monochrome',
        colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF']
      }
    ];
  }

  // Theme presets
  getThemePresets(): ThemePreset[] {
    return [
      {
        name: 'Bold Vibrant',
        colors: ['#FF3366', '#FF6633', '#FFCC33', '#66FF33', '#33CCFF', '#6633FF'],
        fonts: ['Impact', 'Arial Black', 'Montserrat'],
        category: 'bold'
      },
      {
        name: 'Bold Dark',
        colors: ['#1A1A1A', '#FF4444', '#44FF44', '#4444FF', '#FFFF44', '#FF44FF'],
        fonts: ['Impact', 'Arial Black', 'Bebas Neue'],
        category: 'bold'
      },
      {
        name: 'Classic Elegant',
        colors: ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60', '#8E44AD', '#34495E'],
        fonts: ['Georgia', 'Times New Roman', 'Playfair Display'],
        category: 'classic'
      },
      {
        name: 'Classic Vintage',
        colors: ['#8B4513', '#CD853F', '#DAA520', '#B8860B', '#A0522D', '#D2691E'],
        fonts: ['Georgia', 'Times New Roman', 'Crimson Text'],
        category: 'classic'
      },
      {
        name: 'Professional Blue',
        colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#F8FAFC'],
        fonts: ['Roboto', 'Open Sans', 'Lato'],
        category: 'professional'
      },
      {
        name: 'Professional Gray',
        colors: ['#111827', '#374151', '#6B7280', '#9CA3AF', '#D1D5DB', '#F9FAFB'],
        fonts: ['Roboto', 'Open Sans', 'Source Sans Pro'],
        category: 'professional'
      }
    ];
  }

  // Animation presets
  getAnimationPresets(): AnimationPreset[] {
    return [
      { name: 'Bloom', type: 'bloom', duration: 600, easing: 'ease-out' },
      { name: 'Glide', type: 'glide', duration: 800, easing: 'ease-in-out' },
      { name: 'Popping', type: 'popping', duration: 500, easing: 'ease-out' }
    ];
  }

  // Resize presets
  getResizePresets(): ResizePreset[] {
    return [
      { name: 'A4 Portrait', width: 210, height: 297, unit: 'mm' },
      { name: 'A4 Landscape', width: 297, height: 210, unit: 'mm' },
      { name: 'Instagram Post', width: 1080, height: 1080, unit: 'px' },
      { name: 'Instagram Story', width: 1080, height: 1920, unit: 'px' },
      { name: 'TikTok', width: 1080, height: 1920, unit: 'px' },
      { name: 'Facebook Post', width: 1200, height: 630, unit: 'px' },
      { name: 'Twitter Header', width: 1500, height: 500, unit: 'px' },
      { name: 'Custom', width: 800, height: 600, unit: 'px' }
    ];
  }

  // Project management
  createProject(name: string): PosterProject {
    const project: PosterProject = {
      id: this.generateId(),
      name,
      pages: [],
      currentPageId: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const firstPage = this.createPage('Page 1', 800, 600);
    project.pages.push(firstPage);
    project.currentPageId = firstPage.id;

    this.currentProject.set(project);
    this.currentPage.set(firstPage);
    this.projectSubject.next(project);
    this.pageSubject.next(firstPage);

    return project;
  }

  createPage(name: string, width: number, height: number): PosterPage {
    return {
      id: this.generateId(),
      name,
      thumbnail: '',
      canvas: null,
      objects: [],
      backgroundColor: '#ffffff',
      width,
      height
    };
  }

  addPage(name: string, width: number, height: number): void {
    const project = this.currentProject();
    if (!project) return;

    const newPage = this.createPage(name, width, height);
    project.pages.push(newPage);
    project.updatedAt = new Date();

    this.currentProject.set(project);
    this.projectSubject.next(project);
  }

  deletePage(pageId: string): void {
    const project = this.currentProject();
    if (!project || project.pages.length <= 1) return;

    const pageIndex = project.pages.findIndex(p => p.id === pageId);
    if (pageIndex === -1) return;

    project.pages.splice(pageIndex, 1);
    
    // If deleted page was current, switch to first page
    if (project.currentPageId === pageId) {
      project.currentPageId = project.pages[0].id;
      this.currentPage.set(project.pages[0]);
      this.pageSubject.next(project.pages[0]);
    }

    project.updatedAt = new Date();
    this.currentProject.set(project);
    this.projectSubject.next(project);
  }

  setCurrentPage(pageId: string): void {
    const project = this.currentProject();
    if (!project) return;

    const page = project.pages.find(p => p.id === pageId);
    if (!page) return;

    project.currentPageId = pageId;
    this.currentPage.set(page);
    this.projectSubject.next(project);
    this.pageSubject.next(page);
  }

  // Theme management
  toggleTheme(): void {
    this.isDarkTheme.set(!this.isDarkTheme());
  }

  // Utility
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}