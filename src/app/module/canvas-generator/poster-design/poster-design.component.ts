
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poster-design',
  templateUrl: './poster-design.component.html',
  styleUrls: ['./poster-design.component.scss']
})
export class PosterDesignComponent implements OnInit {

  tabs = [
    { id: 'design', name: 'Design', icon: 'fa-picture-o' },
    { id: 'elements', name: 'Elements', icon: 'fa-star' },
    { id: 'text', name: 'Text', icon: 'fa-font' },
    { id: 'brand', name: 'Brand', icon: 'fa-briefcase' },
    { id: 'uploads', name: 'Uploads', icon: 'fa-upload' },
    { id: 'projects', name: 'Projects', icon: 'fa-folder' },
    { id: 'draw', name: 'Draw', icon: 'fa-pencil' },
    { id: 'photos', name: 'Photos', icon: 'fa-camera' },
    { id: 'background', name: 'Background', icon: 'fa-image' }
  ];

  selectedElementType: string | null = null; // To control contextual toolbar

  constructor() { }

  ngOnInit(): void {
  }

  selectElement(type: string) {
    this.selectedElementType = type;
  }

}
