import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CanvasObject } from 'src/app/common/interfaces/poster.model';

@Component({
  selector: 'app-layers-panel',
  templateUrl: './layers-panel.component.html',
  styleUrl: './layers-panel.component.scss',
})
export class LayersPanelComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  @Output() layerSelected = new EventEmitter<CanvasObject>();
  @Output() layerVisibilityChanged = new EventEmitter<{
    layer: CanvasObject;
    visible: boolean;
  }>();
  @Output() layerLockChanged = new EventEmitter<{
    layer: CanvasObject;
    locked: boolean;
  }>();
  @Output() layerOpacityChanged = new EventEmitter<{
    layer: CanvasObject;
    opacity: number;
  }>();
  @Output() layerOrderChanged = new EventEmitter<CanvasObject[]>();

  layers: CanvasObject[] = [
    {
      id: '1',
      type: 'background',
      name: 'Background',
      visible: true,
      locked: false,
      zIndex: 0,
      data: { opacity: 100 },
    },
    {
      id: '2',
      type: 'text',
      name: 'Title Text',
      visible: true,
      locked: false,
      zIndex: 1,
      data: { opacity: 100 },
    },
    {
      id: '3',
      type: 'image',
      name: 'Logo',
      visible: true,
      locked: false,
      zIndex: 2,
      data: { opacity: 100 },
    },
  ];

  selectedLayer: CanvasObject | null = null;

  selectLayer(layer: CanvasObject): void {
    this.selectedLayer = layer;
    this.layerSelected.emit(layer);
  }

  toggleVisibility(layer: CanvasObject, event: Event): void {
    event.stopPropagation();
    layer.visible = !layer.visible;
    this.layerVisibilityChanged.emit({ layer, visible: layer.visible });
  }

  toggleLock(layer: CanvasObject, event: Event): void {
    event.stopPropagation();
    layer.locked = !layer.locked;
    this.layerLockChanged.emit({ layer, locked: layer.locked });
  }

  onOpacityChange(event: Event): void {
    if (this.selectedLayer) {
      const target = event.target as HTMLInputElement;
      const opacity = parseInt(target.value);
      this.selectedLayer.data = { ...this.selectedLayer.data, opacity };
      this.layerOpacityChanged.emit({ layer: this.selectedLayer, opacity });
    }
  }

  onLayerDrop(event: CdkDragDrop<CanvasObject[]>): void {
    moveItemInArray(this.layers, event.previousIndex, event.currentIndex);
    this.layerOrderChanged.emit(this.layers);
  }

  addLayer(): void {
    const newLayer: CanvasObject = {
      id: Date.now().toString(),
      type: 'shape',
      name: `Layer ${this.layers.length + 1}`,
      visible: true,
      locked: false,
      zIndex: this.layers.length,
      data: { opacity: 100 },
    };

    this.layers.push(newLayer);
    this.selectLayer(newLayer);
  }

  duplicateLayer(): void {
    if (this.selectedLayer) {
      const duplicatedLayer: CanvasObject = {
        ...this.selectedLayer,
        id: Date.now().toString(),
        name: `${this.selectedLayer.name} Copy`,
        zIndex: this.layers.length,
      };

      this.layers.push(duplicatedLayer);
      this.selectLayer(duplicatedLayer);
    }
  }

  deleteLayer(): void {
    if (this.selectedLayer && this.layers.length > 1) {
      const index = this.layers.findIndex(
        (l) => l.id === this.selectedLayer!.id
      );
      if (index > -1) {
        this.layers.splice(index, 1);
        this.selectedLayer = this.layers[Math.max(0, index - 1)];
      }
    }
  }

  getLayerIcon(type: string): string {
    switch (type) {
      case 'text':
        return 'text_fields';
      case 'image':
        return 'image';
      case 'shape':
        return 'crop_square';
      case 'background':
        return 'wallpaper';
      default:
        return 'layers';
    }
  }

  close(): void {
    this.closePanel.emit();
  }
}
