import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-element-panel',
  templateUrl: './add-element-panel.component.html',
  styleUrl: './add-element-panel.component.scss'
})
export class AddElementPanelComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() elementAdded = new EventEmitter<{type: string, data: any}>();

  textTypes = [
    { type: 'heading', name: 'Heading', description: 'Large title text', icon: 'title' },
    { type: 'subheading', name: 'Subheading', description: 'Medium subtitle text', icon: 'subtitles' },
    { type: 'body', name: 'Body Text', description: 'Regular paragraph text', icon: 'text_fields' },
    { type: 'caption', name: 'Caption', description: 'Small descriptive text', icon: 'short_text' }
  ];

  shapes = [
    { type: 'rectangle', name: 'Rectangle', icon: 'crop_square' },
    { type: 'circle', name: 'Circle', icon: 'circle' },
    { type: 'triangle', name: 'Triangle', icon: 'change_history' },
    { type: 'line', name: 'Line', icon: 'remove' },
    { type: 'arrow', name: 'Arrow', icon: 'arrow_forward' },
    { type: 'star', name: 'Star', icon: 'star' }
  ];

  icons = [
    { name: 'home' },
    { name: 'person' },
    { name: 'email' },
    { name: 'phone' },
    { name: 'location_on' },
    { name: 'favorite' },
    { name: 'star' },
    { name: 'thumb_up' },
    { name: 'share' },
    { name: 'download' },
    { name: 'upload' },
    { name: 'search' },
    { name: 'settings' },
    { name: 'info' },
    { name: 'help' },
    { name: 'check' }
  ];

  stockImages = [
    { name: 'Abstract 1', url: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Abstract 2', url: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Nature 1', url: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Nature 2', url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Business 1', url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Business 2', url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  addText(type: string): void {
    const textConfigs = {
      heading: { text: 'Your Heading Here', fontSize: 32, fontWeight: 'bold' },
      subheading: { text: 'Your Subheading Here', fontSize: 24, fontWeight: 'normal' },
      body: { text: 'Your body text here', fontSize: 16, fontWeight: 'normal' },
      caption: { text: 'Your caption here', fontSize: 12, fontWeight: 'normal' }
    };

    this.elementAdded.emit({
      type: 'text',
      data: textConfigs[type as keyof typeof textConfigs]
    });
  }

  addShape(type: string): void {
    this.elementAdded.emit({
      type: 'shape',
      data: { shapeType: type }
    });
  }

  addIcon(iconName: string): void {
    this.elementAdded.emit({
      type: 'icon',
      data: { iconName }
    });
  }

  addStockImage(url: string): void {
    this.elementAdded.emit({
      type: 'image',
      data: { url }
    });
  }

  triggerFileUpload(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          this.elementAdded.emit({
            type: 'image',
            data: { url: imageUrl, name: file.name }
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  close(): void {
    this.closePanel.emit();
  }
}
