import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { JwtAuth } from "../../../models/user/jwtAuth";
import { Login } from "../../../models/user/login";
import { Register } from "../../../models/user/register";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "Auth/register";
  loginUrl = "Auth/login";
  refreshTokenUrl = "Auth/refresh-token"

  constructor(private http: HttpClient) { }

  register(user: Register): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.registerUrl}`, user);
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user);
  }

}
