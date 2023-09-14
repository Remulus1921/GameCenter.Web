import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";

import { GameListComponent } from "./game-list/game-list.component";
import { GameRoutingModule } from "./game-routing.module";
import { GameAddComponent } from './game-add/game-add.component';
import { GameFormComponent } from './game-form/game-form.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameDetailsComponent } from './game-details/game-details.component';


@NgModule({
  declarations: [
    GameListComponent,
    GameAddComponent,
    GameFormComponent,
    GameEditComponent,
    GameDetailsComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
