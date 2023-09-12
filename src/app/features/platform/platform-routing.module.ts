import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PlatformAddComponent } from "./platform-add/platform-add.component";
import { PlatformEditComponent } from "./platform-edit/platform-edit.component";
import { PlatformListComponent } from "./platform-list/platform-list.component";

const routes: Routes = [
  {
    path: 'platform',
    component: PlatformListComponent
  },
  {
    path: 'platform/add',
    component: PlatformAddComponent
  },
  {
    path: 'platform/edit/:id',
    component: PlatformEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
