import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ToastService implements OnInit {
    toasts: any[] = [];
    show(message: string, options: any = {}): void {
        options.show = true;
        this.toasts.push({ message, ...options });
    }

    remove(toast: any): void {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }
    constructor() {

    }
    ngOnInit(): void {
        setInterval(() => {
            this.toasts.forEach((value: any, index: number, array: any[]) => {
                setTimeout(() => { this.remove(value) }, 500 * (index + 1))
            })
        }, 5000)
    }
}
