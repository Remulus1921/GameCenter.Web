import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

import { PostAddComponent } from './post-add/post-add.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: 'post',
    component: PostListComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'post/add',
    component: PostAddComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'post/edit/:id',
    component: PostEditComponent,
  },
  {
    path: 'post/details/:id',
    component: PostDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
