import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MaterialModule } from "src/app/material.module";

import { PostAddComponent } from "./post-add/post-add.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostListComponent } from "./post-list/post-list.component";
import { PostRoutingModule } from "./post-routing.module";
import { PostDetailsComponent } from './post-details/post-details.component';


@NgModule({
  declarations: [
    PostListComponent,
    PostAddComponent,
    PostFormComponent,
    PostEditComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class PostModule { }
