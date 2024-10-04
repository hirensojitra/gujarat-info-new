import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    // if (this.router.url === '/') {
    //   this.router.navigate(['/auth/login']);
    //   return false; // Prevent further navigation to '/'
    // }
    return true;
  }
}
