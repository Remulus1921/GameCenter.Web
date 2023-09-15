import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PlatformDto } from "src/app/models/platform/platformDto";

@Component({
  selector: 'app-platform-form',
  templateUrl: './platform-form.component.html',
  styleUrls: ['./platform-form.component.scss']
})
export class PlatformFormComponent {
  @Input() buttonText!: string;
  @Input() platform!: PlatformDto;
  @Output() platformChange = new EventEmitter<PlatformDto>();

  passPlatform(): void {
    this.platformChange.emit(this.platform);
  }
}
