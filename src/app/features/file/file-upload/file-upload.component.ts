import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<File>();
  files: File[] = [];

  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.fileSelected.emit(event.addedFiles[0]);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
