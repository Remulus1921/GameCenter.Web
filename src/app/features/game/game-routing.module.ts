import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GameAddComponent } from "./game-add/game-add.component";
import { GameEditComponent } from "./game-edit/game-edit.component";
import { GameListComponent } from "./game-list/game-list.component";

const routes: Routes = [
  {
    path: 'game',
    component: GameListComponent
  },
  {
    path: 'game/add',
    component: GameAddComponent
  },
  {
    path: 'game/edit/:id',
    component: GameEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
