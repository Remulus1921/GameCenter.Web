import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PlatformService } from 'src/app/core/services/platform/platform.service';
import { PlatformDto } from 'src/app/models/platform/platformDto';

@Component({
  selector: 'app-platform-add',
  templateUrl: './platform-add.component.html',
  styleUrls: ['./platform-add.component.scss'],
})
export class PlatformAddComponent {
  title = 'Dodaj Platformę';
  platform: PlatformDto = {} as PlatformDto;

  constructor(
    private _platformsService: PlatformService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  addPlatform(platform: PlatformDto): void {
    this._platformsService.addPlatform(platform).subscribe(
      () => {
        this.toastr.success('Dodano nową platformę', 'Stan platformy');
        this.goBack();
      },
      (error) => {
        this.toastr.error(error.error, 'Stan platformy');
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
