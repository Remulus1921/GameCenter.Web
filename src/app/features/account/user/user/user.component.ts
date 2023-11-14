import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserDto } from 'src/app/models/user/userDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Twój profil';
  currentUser: UserDto = {} as UserDto;

  token = localStorage.getItem('jwtToken');
  decodedToken: any = jwt_decode(this.token as string);
  email = this.decodedToken.email;

  constructor(
    private _authService: AuthenticationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this._authService.getUserDetails(this.email).subscribe((user) => {
      this.currentUser = user;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
