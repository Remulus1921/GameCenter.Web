import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MaterialModule } from "src/app/material.module";

import { CommentModule } from "../comment/comment.module";
import { GameAddComponent } from "./game-add/game-add.component";
import { GameDetailsComponent } from "./game-details/game-details.component";
import { GameEditComponent } from "./game-edit/game-edit.component";
import { GameFormComponent } from "./game-form/game-form.component";
import { GameListComponent } from "./game-list/game-list.component";
import { GameRoutingModule } from "./game-routing.module";


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
        ReactiveFormsModule,
        NgSelectModule,
        CommentModule
    ]
})
export class GameModule { }
