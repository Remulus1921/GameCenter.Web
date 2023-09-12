import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { PlatformAddComponent } from "./platform-add/platform-add.component";
import { PlatformListComponent } from "./platform-list/platform-list.component";
import { PlatformRoutingModule } from "./platform-routing.module";
import { PlatformFormComponent } from './platform-form/platform-form.component';
import { PlatformEditComponent } from './platform-edit/platform-edit.component';


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
