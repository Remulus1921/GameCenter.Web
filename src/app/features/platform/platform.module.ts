import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { PlatformAddComponent } from "./platform-add/platform-add.component";
import { PlatformEditComponent } from "./platform-edit/platform-edit.component";
import { PlatformFormComponent } from "./platform-form/platform-form.component";
import { PlatformListComponent } from "./platform-list/platform-list.component";
import { PlatformRoutingModule } from "./platform-routing.module";


@NgModule({
  declarations: [
    PlatformAddComponent,
    PlatformListComponent,
    PlatformFormComponent,
    PlatformEditComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PlatformModule { }
