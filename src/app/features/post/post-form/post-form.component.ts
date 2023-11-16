import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { PlatformDto } from "src/app/models/platform/platformDto";
import { PostAddUpdateDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() postForm!: { post: PostAddUpdateDto; image: File | null };
  @Output() postChange = new EventEmitter<{
    post: PostAddUpdateDto;
    image: File | null;
  }>();

  platforms!: PlatformDto[];
  platformsInput$ = new Subject<string>();

  constructor(private _platformService: PlatformService) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  passPost(): void {
    this.postChange.emit({
      post: this.postForm.post,
      image: this.postForm.image,
    });
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    });
  }

  onFileSelected(selectedFile: File): void {
    this.postForm.image = selectedFile;
  }

  validateForm(): boolean {
    return (
      this.validateTitle() && this.validateContent() && this.validatePlatforms()
    );
  }

  validateTitle(): boolean {
    if (this.postForm.post.title === undefined) return false;
    else if (this.postForm.post.title.trim() === '') return false;
    else if (this.postForm.post.title.length > 2) return true;
    else return false;
  }

  validateContent(): boolean {
    if (this.postForm.post.content === undefined) return false;
    else if (this.postForm.post.content.trim() === '') return false;
    else return true;
  }

  validatePlatforms(): boolean {
    if (this.postForm.post.platforms === undefined) return false;
    else if (this.postForm.post.platforms.length === 0) return false;
    else return true;
  }
}
