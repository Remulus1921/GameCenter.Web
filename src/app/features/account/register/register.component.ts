import { Component } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { Register } from "src/app/models/user/register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerDto = new Register();

  constructor(private authService: AuthenticationService){}

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
  }

}