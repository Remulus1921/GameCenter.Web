import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameAddUpdateDto } from 'src/app/models/game/gameDtos';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent implements OnInit {
  title = 'Edytuj Grę';
  id!: string;
  game: GameAddUpdateDto = {} as GameAddUpdateDto;
  image: File = {} as File;

  constructor(
    private _gameService: GameService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this._gameService.getGame(this.id).subscribe((game) => {
      this.game.name = game.name;
      this.game.gameType = game.gameType;
      this.game.description = game.description;
      this.game.capacity = game.capacity;
      this.game.rating = game.rating;
      this.game.platforms = game.platformsName;
      this.game.studio = game.studio;
      this.image = createFileFromDto(game.image);
    });
  }

  updateGame({ game, image }: { game: GameAddUpdateDto; image: File }): void {
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
    this._gameService
      .updateGame(this.id, formData)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  isImageEmpty(): boolean {
    if (this.image && this.image.size > 0) {
      return true;
    }
    return false;
  }
}
