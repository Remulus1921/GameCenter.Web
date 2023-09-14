import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostAddComponent } from "./post-add/post-add.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostListComponent } from "./post-list/post-list.component";

const routes: Routes = [
  {
    path: 'post',
    component: PostListComponent
  },
  {
    path: 'post/add',
    component: PostAddComponent
  },
  {
    path: 'post/edit/:id',
    component: PostEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
