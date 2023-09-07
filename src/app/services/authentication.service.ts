import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { JwtAuth } from "../models/jwtAuth";
import { Login } from "../models/login";
import { Register } from "../models/register";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "Auth/register";
  loginUrl = "Auth/login";

  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user);
  }
}
