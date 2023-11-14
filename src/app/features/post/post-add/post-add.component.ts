import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostAddUpdateDto } from 'src/app/models/post/postDtos';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent {
  title = 'Dodaj Nowy Artykuł';
  post: PostAddUpdateDto = {} as PostAddUpdateDto;
  image: File | null = {} as File;

  constructor(
    private _postService: PostService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  addPost({
    post,
    image,
  }: {
    post: PostAddUpdateDto;
    image: File | null;
  }): void {
    const formData = new FormData();
    if (image && image.size > 0) formData.append('image', image, image.name);

    formData.append('title', post.title);
    formData.append('content', post.content);

    post.platforms.forEach((platform) => {
      formData.append('platforms', platform);
    });

    this._postService.addPost(formData).subscribe(
      (response) => {
        this.toastr.success(response, 'Stan artykułu');
        this.goBack();
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }
}
