import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { PostService } from "src/app/core/services/post/post.service";
import { PostAddUpdateDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent {
  title = "Dodaj Nowy Post";
  post: PostAddUpdateDto = {} as PostAddUpdateDto;

  constructor(private _postService: PostService, private location: Location) {}

  addPost(post: PostAddUpdateDto): void {
    this._postService.addPost(post).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
