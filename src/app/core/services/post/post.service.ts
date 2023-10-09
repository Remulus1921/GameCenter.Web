import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostDto, PostSmallDto } from 'src/app/models/post/postDtos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl = 'Posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostSmallDto[]> {
    return this.http.get<PostSmallDto[]>(
      `${environment.apiUrl}/${this.postUrl}`
    );
  }

  getPost(id: string): Observable<PostDto> {
    return this.http.get<PostDto>(
      `${environment.apiUrl}/${this.postUrl}/${id}`
    );
  }

  addPost(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${environment.apiUrl}/${this.postUrl}`, formData, {
      headers,
      responseType: 'text',
    });
  }

  updatePost(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put(
      `${environment.apiUrl}/${this.postUrl}/${id}`,
      formData,
      {
        headers,
        responseType: 'text',
      }
    );
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.postUrl}/${id}`);
  }
}
