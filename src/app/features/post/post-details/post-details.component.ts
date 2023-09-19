import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/core/services/post/post.service";
import { PostDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{
  post: PostDto = {} as PostDto;
  id!: string;
  date!: Date;

  constructor(
    private _postService: PostService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.getPostDetails();
  }

  getPostDetails(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this._postService.getPost(this.id).subscribe((post) => this.post = post);

  }

  setDate(): void {
    if(this.post.created != this.post.modified) {
      this.date = this.post.modified;
    } else {
      this.date = this.post.created;
    }
  }

}
