import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PostAddUpdateDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  @Input() buttonText!: string;
  @Input() post!: PostAddUpdateDto;
  @Output() postChange = new EventEmitter<PostAddUpdateDto>();

  passPost(): void {
    this.postChange.emit(this.post);
  }
}
