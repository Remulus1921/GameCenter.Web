import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GameAddUpdateDto } from "src/app/models/game/gameDtos";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent {
  @Input() buttonText!: string;
  @Input() game!: GameAddUpdateDto;
  @Output() gameChange = new EventEmitter<GameAddUpdateDto>();

  passGame(): void {
    this.gameChange.emit(this.game);
  }
}
