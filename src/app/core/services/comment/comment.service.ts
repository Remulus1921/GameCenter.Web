import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CommentDto, CommentSmallDto } from "src/app/models/comment/commentDtos";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentUrl = "Comments";

  constructor(private http: HttpClient) { }

  getComments(gameId: string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(`${environment.apiUrl}/${this.commentUrl}/${gameId}`);
  }

  addComment(gameId: string, comment: CommentSmallDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.commentUrl}/${gameId}`, comment, {responseType: 'text'});
  }

  updateComment(id: string, comment: CommentSmallDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.commentUrl}/${id}`, comment);
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.commentUrl}/${id}`);
  }
}
