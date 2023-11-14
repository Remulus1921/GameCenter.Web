import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { Register } from 'src/app/models/user/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerDto = new Register();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe(
      (response) => {
        console.log(response);
        if (response.status >= 200 && response.status <= 300) {
          this.toastr.success(
            'Zarejestrowano, zaloguj się',
            'Stan rejestracji'
          );
          this.router.navigate(['login']);
        } else {
          this.toastr.error(response, 'Stan rejestracji');
        }
      },
      (error) => {
        console.log(error.error);
        let errorData: any;
        try {
          errorData =
            typeof error.error === 'string'
              ? JSON.parse(error.error)
              : error.error;
        } catch (parseError) {
          errorData = { errors: { message: error.error } };
        }
        Object.keys(errorData.errors).forEach((element) => {
          this.toastr.error(`${errorData.errors[element]}`, 'Stan rejestracji');
        });
      }
    );
  }
}
