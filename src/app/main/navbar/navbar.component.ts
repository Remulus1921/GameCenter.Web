import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private auth: AuthenticationService) {}
  title = 'Game Center';

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isInRole(): boolean {
    return this.auth.isInRole();
  }

  logout(): void {
    this.auth.logout();
  }
}
