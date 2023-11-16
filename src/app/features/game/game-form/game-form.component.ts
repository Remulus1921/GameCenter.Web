import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
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
  @Input() gameForm!: { game: GameAddUpdateDto; image: File };
  @Output() gameChange = new EventEmitter<{
    game: GameAddUpdateDto;
    image: File;
  }>();

  platforms!: PlatformDto[];
  platformsInput$ = new Subject<string>();
  gameFormGroup!: FormGroup;

  constructor(
    private _platformService: PlatformService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  passGame(): void {
    if (this.validateForm()) {
      this.gameChange.emit({
        game: this.gameForm.game,
        image: this.gameForm.image,
      });
    } else {
      this.toastr.error(
        'Popraw błędy i spróbuj ponownie',
        'Błędy w formularzu.'
      );
    }
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    });
  }

  onFileSelected(selectedFile: File): void {
    this.gameForm.image = selectedFile;
  }

  validateForm(): boolean {
    const vName = this.validateName();
    const vGameType = this.validateGameType();
    const vCapacity = this.validateCapacity();
    const vDescription = this.validateDescription();
    const vPlatforms = this.validatePlatforms();
    const vStudio = this.validateStudio();
    const vRating = this.validateRating();
    const vImage = this.gameForm.image.size ? true : false;
    return (
      vName &&
      vGameType &&
      vCapacity &&
      vDescription &&
      vPlatforms &&
      vStudio &&
      vRating &&
      vImage
    );
  }

  validateName(): boolean {
    if (this.gameForm.game.name === undefined) return false;
    else if (this.gameForm.game.name.trim() === '') return false;
    else if (this.gameForm.game.name.length > 2) return true;
    else return false;
  }

  validateGameType(): boolean {
    if (this.gameForm.game.gameType === undefined) return false;
    else if (this.gameForm.game.gameType.trim() === '') return false;
    else if (this.gameForm.game.gameType.length > 2) return true;
    else return false;
  }

  validateDescription(): boolean {
    if (this.gameForm.game.description === undefined) return false;
    else if (this.gameForm.game.description.trim() === '') return false;
    else if (this.gameForm.game.description.length > 50) return true;
    else return false;
  }

  validateStudio(): boolean {
    if (this.gameForm.game.studio === undefined) return false;
    else if (this.gameForm.game.studio.trim() === '') return false;
    else if (this.gameForm.game.studio.length != 0) return true;
    else return false;
  }

  validateRating(): boolean {
    if (this.gameForm.game.rating === undefined) return false;
    else return true;
  }

  validateCapacity(): boolean {
    if (this.gameForm.game.capacity === undefined) return false;
    else if (this.gameForm.game.capacity < 0.01) return false;
    else return true;
  }

  validatePlatforms(): boolean {
    if (this.gameForm.game.platforms === undefined) return false;
    else if (this.gameForm.game.platforms.length === 0) return false;
    else return true;
  }
}
