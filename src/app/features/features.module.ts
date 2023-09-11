import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginModule } from "./account/login/login.module";
import { RegisterModule } from "./account/register/register.module";
import { FeaturesRoutingModule } from "./features-routing.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    LoginModule,
    RegisterModule
  ]
})
export class FeaturesModule { }
