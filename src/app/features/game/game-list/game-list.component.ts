import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/core/services/game/game.service";
import { GameSmallDto } from "src/app/models/game/gameDtos";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit{
  title = "Gry";
  games!: GameSmallDto[];

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList(): void {
    this._gameService.getGames().subscribe((games) => {
      this.games = games
    });
  }

  deleteGame(id: string): void {
    this._gameService.deleteGame(id).subscribe(() => this.getGameList());
  }
}
