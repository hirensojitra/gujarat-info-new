import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  currentLayout: string = 'dashboard-layout'; // Default layout

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentLayout = this.route.snapshot.firstChild?.data['layout'] || 'dashboard-layout';
      });
  }
}
