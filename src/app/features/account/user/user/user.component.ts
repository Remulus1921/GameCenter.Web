import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import jwt_decode from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { UserUpdateDto } from "src/app/models/user/userDto";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Twój profil';
  currentUser: UserUpdateDto = {} as UserUpdateDto;
  updateUser: UserUpdateDto = {} as UserUpdateDto;

  token = localStorage.getItem('jwtToken');
  decodedToken: any = jwt_decode(this.token as string);
  email = this.decodedToken.email;
  editFirstName: Boolean = false;
  editLastName: Boolean = false;
  editUserName: Boolean = false;
  changePasswordMode: Boolean = false;
  newPassword: string = '';
  passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  constructor(
    private _authService: AuthenticationService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this._authService.getUserDetails(this.email).subscribe((user) => {
      this.currentUser = user;
      this.updateUser = user;
    });
  }

  editField(field: string): void {
    switch (field) {
      case 'firstName':
        this.editFirstName = true;
        break;
      case 'lastName':
        this.editLastName = true;
        break;
      case 'userName':
        this.editUserName = true;
        break;
      default:
        break;
    }
  }

  saveField(field: string): void {
    switch (field) {
      case 'firstName':
        if (this.currentUser.firstName.trim() === '')
          this.toastr.error('Pole Imię nie może być puste', 'Stan profilu');
        else this.editFirstName = false;
        break;
      case 'lastName':
        if (this.currentUser.lastName.trim() === '')
          this.toastr.error('Pole Nazwisko nie może być puste', 'Stan profilu');
        else this.editFirstName = false;
        this.editLastName = false;
        break;
      case 'userName':
        if (this.currentUser.userName.trim() === '')
          this.toastr.error('Pole Imię nie może być puste', 'Stan profilu');
        else this.editFirstName = false;
        this.editUserName = false;
        break;
      default:
        break;
    }
  }

  changePassword(): void {
    this.changePasswordMode = true;
  }

  savePassword(): void {
    if (!this.passwordRegex.test(this.newPassword)) {
      this.toastr.error(
        'Hasło ma jest nie prawidłowe. Hasło powinno mieć długość co najmniej 8 znaków, zawierać dużą i małą literę, liczbę i znak specjalny',
        'Stan rejestracji'
      );
      return;
    }
    this.updateUser.password = this.newPassword;
    this.changePasswordMode = false;
  }

  cancel(field: string): void {
    switch (field) {
      case 'firstName':
        this.editFirstName = false;
        break;
      case 'lastName':
        this.editLastName = false;
        break;
      case 'userName':
        this.editUserName = false;
        break;
      case 'password':
        this.changePasswordMode = false;
        break;
      default:
        break;
    }
  }

  updateProfile(): void {
    if (this.updateUser.password === null) this.updateUser.password = '';
    console.log(this.updateUser);
    this._authService.updateUser(this.updateUser).subscribe(
      (response) => {
        this.toastr.success('Zaktualizowano dane profilu', 'Stan profilu');
      },
      (error) => {
        this.toastr.error(error.error, 'Stan profilu');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
