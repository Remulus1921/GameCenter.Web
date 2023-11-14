import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { Post } from 'src/app/models/post/postDtos';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  title = 'Artykuły';
  posts: Post[] = [];

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _postService: PostService,
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPostList();
    if (this.isLoggedWithAccess()) {
      this.displayedColumns = [
        'index',
        'title',
        'date',
        'image',
        'details',
        'edit',
        'delete',
      ];
    } else {
      this.displayedColumns = ['index', 'title', 'date', 'image', 'details'];
    }
  }

  getPostList(): void {
    this._postService.getPosts().subscribe((posts) => {
      this.posts = [];
      this.posts = posts.map((post) => ({
        id: post.id,
        title: post.title,
        created: post.created,
        modified: post.modified,
        imageUrl:
          post.image != null
            ? URL.createObjectURL(createFileFromDto(post.image))
            : null,
        platforms: post.platforms,
      }));

      this.dataSource = new MatTableDataSource(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Post, filter: string) => {
        return data.title.toLowerCase().includes(filter);
      };
    });
  }

  deletePost(id: string): void {
    this._postService.deletePost(id).subscribe(
      () => {
        this.toastr.warning('Usunięto artykuł', 'Stan artykułu');
        this.getPostList();
      },
      (error) => {
        this.toastr.error('Wystąpił błąd podczas usuwania', 'Stan artykułu');
      }
    );
  }

  isLoggedWithAccess(): boolean {
    return this.auth.isInRole() && this.auth.isLoggedIn();
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const value = inputElement.value.trim().toLowerCase();
      this.dataSource.filter = value;
      if (this.dataSource.filterPredicate) {
        this.dataSource.filterPredicate = (data: Post, filter: string) => {
          return data.title.toLowerCase().includes(filter);
        };
      }
    }
  }
}
