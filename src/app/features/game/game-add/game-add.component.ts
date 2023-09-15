import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { GameService } from "src/app/core/services/game/game.service";
import { GameAddUpdateDto } from "src/app/models/game/gameDtos";

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.scss']
})
export class GameAddComponent {
  title = "Dodaj Nową Grę";
  game: GameAddUpdateDto = {} as GameAddUpdateDto;

  constructor(private _gameService: GameService, private location: Location) {}

  addGame(game: GameAddUpdateDto): void {
    this._gameService.addGame(game).subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
