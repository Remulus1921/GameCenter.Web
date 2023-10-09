import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostDto } from 'src/app/models/post/postDtos';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post: PostDto = {} as PostDto;
  id: string = String(this.route.snapshot.paramMap.get('id'));
  date!: Date;
  imageUrl: string | null = null;

  constructor(
    private _postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPostDetails();
  }

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  getPostDetails(): void {
    this._postService.getPost(this.id).subscribe((post) => {
      this.post = post;
      if (post.image != null)
        this.imageUrl = URL.createObjectURL(createFileFromDto(post.image));
    });
  }

  setDate(): void {
    if (this.post.created != this.post.modified) {
      this.date = this.post.modified;
    } else {
      this.date = this.post.created;
    }
  }
}
