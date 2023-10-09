import { Component, OnInit } from '@angular/core';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostSmallDto } from 'src/app/models/post/postDtos';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  title = 'Posty';
  posts: { post: PostSmallDto; imageUrl: string | null }[] = [];

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList(): void {
    this._postService.getPosts().subscribe((posts) => {
      this.posts = [];
      posts.forEach((post) => {
        if (post.image == null) {
          this.posts.push({ post, imageUrl: null });
        } else {
          const imageUrl = URL.createObjectURL(createFileFromDto(post.image));
          this.posts.push({ post, imageUrl: imageUrl });
        }
      });
    });
  }

  deletePost(id: string): void {
    this._postService.deletePost(id).subscribe(() => this.getPostList());
  }
}
