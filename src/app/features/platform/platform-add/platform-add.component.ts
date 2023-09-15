import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-platform-add',
  templateUrl: './platform-add.component.html',
  styleUrls: ['./platform-add.component.scss']
})
export class PlatformAddComponent {
  title = "Dodaj Platformę";
  platform: PlatformDto = {} as PlatformDto;

  constructor(private _platformsService: PlatformService, private location: Location) {}

  addPlatform(platform: PlatformDto): void {
    this._platformsService.addPlatform(platform).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
