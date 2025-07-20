import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePreset } from 'src/app/common/interfaces/poster.model';
import { PosterService } from 'src/app/common/services/poster';

@Component({
  selector: 'app-theme-panel',
  templateUrl: './theme-panel.component.html',
  styleUrl: './theme-panel.component.scss',
})
export class ThemePanelComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() themeSelected = new EventEmitter<ThemePreset>();

  allThemes: ThemePreset[] = [];
  selectedTheme: ThemePreset | null = null;

  get boldThemes(): ThemePreset[] {
    return this.allThemes.filter((t) => t.category === 'bold');
  }

  get classicThemes(): ThemePreset[] {
    return this.allThemes.filter((t) => t.category === 'classic');
  }

  get professionalThemes(): ThemePreset[] {
    return this.allThemes.filter((t) => t.category === 'professional');
  }

  constructor(private posterService: PosterService) {
    this.allThemes = this.posterService.getThemePresets();
  }

  selectTheme(theme: ThemePreset): void {
    this.selectedTheme = theme;
  }

  applyTheme(): void {
    if (this.selectedTheme) {
      this.themeSelected.emit(this.selectedTheme);
      this.close();
    }
  }

  close(): void {
    this.closePanel.emit();
  }
}
