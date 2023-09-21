import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material.module";
import { LoginModule } from "./account/login/login.module";
import { RegisterModule } from "./account/register/register.module";
import { CommentModule } from "./comment/comment.module";
import { FeaturesRoutingModule } from "./features-routing.module";
import { GameModule } from "./game/game.module";
import { PlatformModule } from "./platform/platform.module";
import { PostModule } from "./post/post.module";


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
    CommentModule,
    GameModule,
    PostModule,
  ]
})
export class FeaturesModule { }
