import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateY(100%)', opacity: 0 })
        )
      ])
    ])
  ]
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }
  removeToast(index: number): void {
    this.toastService.toasts.splice(index, 1);
  }
}
