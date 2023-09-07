import { Component } from "@angular/core";

import { JwtAuth } from "./models/jwtAuth";
import { Login } from "./models/login";
import { Register } from "./models/register";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameCenter.Web';
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(private authService: AuthenticationService) {}

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
  }

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }
}
