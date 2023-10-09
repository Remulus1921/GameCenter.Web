import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostAddUpdateDto } from 'src/app/models/post/postDtos';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  title = 'Edytuj post';
  id!: string;
  post: PostAddUpdateDto = {} as PostAddUpdateDto;
  image: File | null = {} as File;

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
      this.post.platforms = post.platforms;

      if (post.image != null) this.image = createFileFromDto(post.image);
      else if (post.image == null) this.image = null;
    });
  }

  updatePost({
    post,
    image,
  }: {
    post: PostAddUpdateDto;
    image: File | null;
  }): void {
    const formData = new FormData();

    if (image != null) formData.append('image', image, image.name);

    formData.append('title', post.title);
    formData.append('content', post.content);
    post.platforms.forEach((platform) => {
      formData.append('platforms', platform);
    });

    this._postService
      .updatePost(this.id, formData)
      .subscribe(() => this.goBack());
  }

  isImageEmpty(): boolean {
    if (this.image === null) return true;

    if (this.image && this.image.size > 0) {
      return true;
    }
    return false;
  }

  goBack(): void {
    this.location.back();
  }
}
