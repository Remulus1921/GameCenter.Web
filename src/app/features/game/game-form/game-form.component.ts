import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { GameAddUpdateDto } from "src/app/models/game/gameDtos";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() game!: GameAddUpdateDto;
  @Output() gameChange = new EventEmitter<GameAddUpdateDto>();

  platforms!: PlatformDto[];
  platformsInput$ = new Subject<string>();

  constructor(private _platformService: PlatformService) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  passGame(): void {
    this.gameChange.emit(this.game);
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    });
  }

  onFileSelected(selectedFile: File): void {
    this.game.image = selectedFile;
    console.log(selectedFile);
  }
}
