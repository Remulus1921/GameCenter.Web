import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { JwtAuth } from "src/app/models/jwtAuth";
import { Login } from "src/app/models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = "Login";
  loginDto = new Login();
  jwtDto = new JwtAuth();

  constructor(private authService: AuthenticationService){}

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }
}
