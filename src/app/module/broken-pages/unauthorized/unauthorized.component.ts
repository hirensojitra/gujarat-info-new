// src/app/unauthorized/unauthorized.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  expectedRoles: string[] = [];
  returnUrl = '/';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const exp = params.get('expected');
      this.expectedRoles = exp ? exp.split(',') : [];
      this.returnUrl     = params.get('returnUrl') || '/';
    });
  }
}
