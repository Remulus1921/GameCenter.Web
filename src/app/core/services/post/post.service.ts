import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PostAddUpdateDto, PostDto, PostSmallDto } from "src/app/models/post/postDtos";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postUrl = "Posts";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<PostSmallDto[]> {
    return this.http.get<PostSmallDto[]>(`${environment.apiUrl}/${this.postUrl}`);
  }

  getPost(id: string): Observable<PostDto> {
    return this.http.get<PostDto>(`${environment.apiUrl}/${this.postUrl}/${id}`);
  }

  addPost(post: PostAddUpdateDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.postUrl}`, post, {responseType: 'text'});
  }

  updatePost(id: string, post: PostAddUpdateDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.postUrl}/${id}`, post, {responseType: 'text'});
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.postUrl}/${id}`);
  }
}
