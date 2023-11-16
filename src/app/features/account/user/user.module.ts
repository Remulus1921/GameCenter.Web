import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { UserListComponent } from "./user-list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user/user.component";

@NgModule({
  declarations: [UserListComponent, UserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    UserRoutingModule,
    MaterialModule,
  ],
})
export class UserModule {}
