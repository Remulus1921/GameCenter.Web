import { Component, OnInit } from '@angular/core';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameSmallDto } from 'src/app/models/game/gameDtos';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  title = 'Gry';
  games: { game: GameSmallDto; imageUrl: string }[] = [];

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList(): void {
    this._gameService.getGames().subscribe((games) => {
      this.games = [];
      games.forEach((game) => {
        const imageUrl = URL.createObjectURL(createFileFromDto(game.image));
        this.games.push({ game, imageUrl });
      });
    });
  }

  deleteGame(id: string): void {
    this._gameService.deleteGame(id).subscribe(() => this.getGameList());
  }
}
