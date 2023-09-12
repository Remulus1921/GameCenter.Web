import { Component, OnInit } from "@angular/core";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-platform-list',
  templateUrl: './platform-list.component.html',
  styleUrls: ['./platform-list.component.css']
})
export class PlatformListComponent implements OnInit{
  title = "Panel Platform";
  platforms!: PlatformDto[];

  constructor(private _platformService: PlatformService) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    })
  }

  deletePlatform(platformId: string): void {
    this._platformService.deletePlatform(this.platforms.find((platform) => platform.id === platformId)!)
      .subscribe(() => this.getPlatformList());
  }
}
