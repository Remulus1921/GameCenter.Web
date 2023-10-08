import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameAddUpdateDto } from 'src/app/models/game/gameDtos';

@Component({
  selector: 'app-game-add',
  templateUrl: './game-add.component.html',
  styleUrls: ['./game-add.component.scss'],
})
export class GameAddComponent {
  title = 'Dodaj Nową Grę';
  game: GameAddUpdateDto = {} as GameAddUpdateDto;
  image: File = {} as File;

  constructor(private _gameService: GameService, private location: Location) {}

  addGame({ game, image }: { game: GameAddUpdateDto; image: File }): void {
    const formData = new FormData();
    formData.append('image', image, image.name);

    formData.append('name', game.name);
    formData.append('gameType', game.gameType);
    formData.append('description', game.description);
    formData.append('capacity', game.capacity.toString());
    formData.append('rating', game.rating);
    formData.append('studio', game.studio);

    game.platforms.forEach((platform) => {
      formData.append('platforms', platform);
    });

    this._gameService.addGame(formData).subscribe(() => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
