import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { PostRoutingModule } from "./post-routing.module";
import { PostListComponent } from './post-list/post-list.component';
import { PostAddComponent } from './post-add/post-add.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostEditComponent } from './post-edit/post-edit.component';


@NgModule({
  declarations: [
    PostListComponent,
    PostAddComponent,
    PostFormComponent,
    PostEditComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
