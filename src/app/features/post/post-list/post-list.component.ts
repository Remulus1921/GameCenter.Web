import { Component, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post/post.service";
import { PostSmallDto } from "src/app/models/post/postDtos";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  title = "Posty";
  posts!: PostSmallDto[];

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    this._postService.getPosts().subscribe((posts) => {
      this.posts = posts
    });
  }

  deletePost(id: string): void {
    this._postService.deletePost(id).subscribe(() => this.getPostList());
  }
}
