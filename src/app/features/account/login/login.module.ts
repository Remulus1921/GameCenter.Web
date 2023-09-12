import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class LoginModule { }
