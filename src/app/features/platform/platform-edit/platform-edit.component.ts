import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-platform-edit',
  templateUrl: './platform-edit.component.html',
  styleUrls: ['./platform-edit.component.css']
})
export class PlatformEditComponent implements OnInit {
  title = "Edytuj Platformę";
  id!: string;
  @Input() platform: PlatformDto = {} as PlatformDto;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private _platformService: PlatformService
    ) {}

  ngOnInit(): void {
    this.getPlatform();
  }

  getPlatform(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this._platformService.getSinglePlatform(this.id).subscribe((platform) => (this.platform = platform));
  }

  updatePlatform(platform: PlatformDto): void {
    this._platformService.updatePlatform(platform).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
