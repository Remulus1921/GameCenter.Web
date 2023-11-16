import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { RoleDto, UserDto, UserUpdateDto } from "src/app/models/user/userDto";
import { environment } from "src/environments/environment";

import { JwtAuth } from "../../../models/user/jwtAuth";
import { Login } from "../../../models/user/login";
import { Register } from "../../../models/user/register";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  registerUrl = 'Auth/register';
  loginUrl = 'Auth/login';
  refreshTokenUrl = 'Auth/refresh-token';
  userListUrl = 'Auth/get-users';
  grantTheRoleUrl = 'Auth/grant-the-role';
  deleteUserUrl = 'Auth/delete-user';
  userDetailsUrl = 'Auth/user-details';
  userUpdateUrl = 'Auth/update-user';
  options = { withCredentials: true };
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  register(user: Register): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });
    return this.http.post(`${environment.apiUrl}/${this.registerUrl}`, user, {
      headers,
      responseType: 'text',
    });
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(
      `${environment.apiUrl}/${this.loginUrl}`,
      user,
      this.options
    );
  }

  refreshToken(email: string): Observable<JwtAuth> {
    return this.http.get<JwtAuth>(
      `${environment.apiUrl}/${this.refreshTokenUrl}/${email}`,
      this.options
    );
  }

  getUsersList(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${environment.apiUrl}/${this.userListUrl}`
    );
  }

  getUserDetails(userEmail: string): Observable<UserUpdateDto> {
    return this.http.get<UserUpdateDto>(
      `${environment.apiUrl}/${this.userDetailsUrl}/${userEmail}`
    );
  }

  updateUser(user: UserUpdateDto): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    return this.http.put(`${environment.apiUrl}/${this.userUpdateUrl}`, user, {
      headers,
      responseType: 'text',
    });
  }

  grantTheRole(roleDto: RoleDto): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/${this.grantTheRoleUrl}`,
      roleDto
    );
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${this.deleteUserUrl}/${email}`
    );
  }

  startTokenTimer(): void {
    const token = localStorage.getItem('jwtToken');

    if (!token) return;

    const tokenPayload: any = jwt_decode(token as string);
    const expirationTime = tokenPayload.exp * 1000;
    let userEmail: string = '';

    const now = new Date().getTime();
    const timeUntilExpiration = expirationTime - now - 5000;

    this.tokenExpirationTimer = setTimeout(() => {
      userEmail = tokenPayload.email;

      this.refreshToken(userEmail).subscribe(
        (newToken) => {
          localStorage.setItem('jwtToken', newToken.token);
          localStorage.setItem('role', tokenPayload.role);
          this.startTokenTimer();
        },
        (error) => {
          this.toastr.error(error.error);
          this.logout();
        }
      );
    }, timeUntilExpiration);
  }

  stopTokenTimer(): void {
    clearTimeout(this.tokenExpirationTimer);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  isInRole(): boolean {
    if (
      localStorage.getItem('role') == 'Admin' ||
      localStorage.getItem('role') == 'Moderator'
    ) {
      return true;
    }
    return false;
  }

  isAdmin(): boolean {
    if (localStorage.getItem('role') === 'Admin') return true;

    return false;
  }

  isMod(): boolean {
    if (localStorage.getItem('role') === 'Moderator') return true;

    return false;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
  }
}
