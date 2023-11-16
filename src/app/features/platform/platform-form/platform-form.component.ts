import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.scss'],
})
export class PlatformFormComponent {
  @Input() buttonText!: string;
  @Input() platform!: PlatformDto;
  @Output() platformChange = new EventEmitter<PlatformDto>();

  constructor(private toaster: ToastrService) {}

  passPlatform(): void {
    if (
      this.platform.name !== undefined &&
      this.platform.name.trim() !== '' &&
      this.platform.name.length >= 2
    )
      this.platformChange.emit(this.platform);
    else
      this.toaster.error(
        'Popraw błędy i spróbuj ponownie',
        'Błędy w formularzu'
      );
  }
}
