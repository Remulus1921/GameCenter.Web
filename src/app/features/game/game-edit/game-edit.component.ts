import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameService } from "src/app/core/services/game/game.service";
import { GameAddUpdateDto } from "src/app/models/game/gameDtos";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit{
  title = "Edytuj Grę";
  id!: string;
  @Input() game: GameAddUpdateDto = {} as GameAddUpdateDto;

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
      this.game.imagePath = game.imagePath;
    });
  }

  updateGame(game: GameAddUpdateDto): void {
    this._gameService.updateGame(this.id, game).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
