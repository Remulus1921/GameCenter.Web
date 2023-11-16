import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input() image!: File | null;
  @Output() fileSelected = new EventEmitter<File>();
  files: File[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    if (this.image instanceof Blob) {
      this.files.push(this.image);
    }
  }

  onSelect(event: any) {
    this.errorMessage = null;
    if (event.addedFiles.length > 1) {
      this.errorMessage = 'Można dodac tylko jeden plik';
    } else {
      if (event.addedFiles[0] != undefined) {
        this.files = [];
        this.files.push(...event.addedFiles);
        this.fileSelected.emit(event.addedFiles[0]);
      } else
        this.errorMessage = 'Akceptowane są tylko pliki o rozszerzeniu .jpg';
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
