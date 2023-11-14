import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

import { GameAddComponent } from './game-add/game-add.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
  {
    path: 'game',
    component: GameListComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'game/add',
    component: GameAddComponent,
  },
  {
    canActivate: [AuthGuard, RoleGuard],
    path: 'game/edit/:id',
    component: GameEditComponent,
  },
  {
    path: 'game/details/:id',
    component: GameDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
