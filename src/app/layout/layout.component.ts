import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  currentLayout: string = 'empty-layout';

  constructor(private activatedRoute: ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.currentLayout = data['layout'] || 'empty';
    });
  }
}
