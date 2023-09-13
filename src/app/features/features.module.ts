import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material.module";
import { LoginModule } from "./account/login/login.module";
import { RegisterModule } from "./account/register/register.module";
import { FeaturesRoutingModule } from "./features-routing.module";
import { GameModule } from "./game/game.module";
import { PlatformModule } from "./platform/platform.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginModule,
    RegisterModule,
    PlatformModule,
    GameModule
  ]
})
export class FeaturesModule { }
