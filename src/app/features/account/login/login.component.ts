import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { JwtAuth } from 'src/app/models/user/jwtAuth';
import { Login } from 'src/app/models/user/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  title = 'Login';
  loginDto = new Login();
  jwtDto = new JwtAuth();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe(
      (jwtDto) => {
        const tokenPayload: any = jwt_decode(jwtDto.token);
        localStorage.setItem('jwtToken', jwtDto.token);
        localStorage.setItem('role', tokenPayload.role);
        this.authService.startTokenTimer();
        this.toastr.success('Zalogowano', 'Stan logowania');
        this.router.navigate(['post']);
      },
      (error) => {
        this.toastr.error('Błędny login lub hasło', 'Stan logowania');
      }
    );
  }
}
