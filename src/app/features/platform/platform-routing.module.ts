import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

import { PlatformAddComponent } from './platform-add/platform-add.component';
import { PlatformEditComponent } from './platform-edit/platform-edit.component';
import { PlatformListComponent } from './platform-list/platform-list.component';

const routes: Routes = [
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'platform',
    component: PlatformListComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'platform/add',
    component: PlatformAddComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'platform/edit/:id',
    component: PlatformEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
