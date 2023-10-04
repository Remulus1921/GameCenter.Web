import { Location } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/core/services/post/post.service";
import { PostAddUpdateDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  title = 'Edytuj post';
  id!: string;
  @Input() post: PostAddUpdateDto = {} as PostAddUpdateDto;

  constructor(
    private _postService: PostService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this._postService.getPost(this.id).subscribe((post) => {
      this.post.title = post.title;
      this.post.content = post.content;
      this.post.image = post.image;
      this.post.platforms = post.platforms;
    });
  }

  updatePost(post: PostAddUpdateDto): void {
    this._postService.updatePost(this.id, post).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
