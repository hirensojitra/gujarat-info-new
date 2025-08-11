import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private sub = new Subscription();
  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}