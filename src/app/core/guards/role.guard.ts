import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let role = localStorage.getItem('role');
    if (role === 'Admin' || role === 'Moderator') {
      return true;
    }
    alert(
      'Brak dostępu, musisz być adminem albo moderatorem żeby zobaczyć tą cześć strony'
    );
    this.router.navigate(['/post']);
    return false;
  }
}
