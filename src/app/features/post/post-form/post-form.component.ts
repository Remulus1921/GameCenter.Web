import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { PlatformService } from "src/app/core/services/platform/platform.service";
import { PlatformDto } from "src/app/models/platform/platformDto";
import { PostAddUpdateDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit{
  @Input() buttonText!: string;
  @Input() post!: PostAddUpdateDto;
  @Output() postChange = new EventEmitter<PostAddUpdateDto>();

  platforms!: PlatformDto[];
  platformsInput$ = new Subject<string>();

  constructor(private _platformService: PlatformService) {}

  ngOnInit(): void {
    this.getPlatformList();
  }

  passPost(): void {
    this.postChange.emit(this.post);
  }

  getPlatformList(): void {
    this._platformService.getPlatforms().subscribe((platforms) => {
      this.platforms = platforms;
    })
  }
}
