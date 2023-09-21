import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment/comment.service';
import { ActiveComment } from 'src/app/models/comment/activeComment';
import {
  CommentDto,
  CommentSmallDto,
} from 'src/app/models/comment/commentDtos';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() currentUserEmail!: string;
  @Input() gameId!: string;

  comments: CommentDto[] = [];
  mainComments: CommentDto[] = [];
  activeComment: ActiveComment | null = null;

  constructor(private _commentService: CommentService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments(): void {
    this._commentService.getComments(this.gameId).subscribe((comments) => {
      this.comments = comments;
      this.mainComments = comments.filter(
        (comment) => comment.parentId === null
      );
    });
  }

  addComment({
    text,
    parentId,
  }: {
    text: string;
    parentId: null | string;
  }): void {
    const comment: CommentSmallDto = {
      commentContent: text,
      parentId: parentId,
      id: null,
    };
    this._commentService.addComment(this.gameId, comment).subscribe(() => {
      this.getComments();
      this.activeComment = null;
    });
  }

  updateComment({
    text,
    commentId,
  }: {
    text: string;
    commentId: string;
  }): void {
    const updateComment: CommentSmallDto = {
      id: commentId,
      commentContent: text,
      parentId: null,
    };
    this._commentService
      .updateComment(commentId, updateComment)
      .subscribe(() => {
        this._commentService.getComments(this.gameId).subscribe((comments) => {
          this.comments = comments;
        });
        this.activeComment = null;
      });
  }

  deleteComment(commentId: string): void {
    this._commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId && comment.parentId !== commentId
      );
      this.mainComments = this.comments.filter(
        (comment) => comment.parentId === null
      );
    });
  }

  getReplies(id: string): CommentDto[] {
    return this.comments
      .filter((comment) => comment.parentId === id)
      .sort(
        (a, b) =>
          new Date(a.creationDate).getMilliseconds() -
          new Date(b.creationDate).getMilliseconds()
      );
  }

  setActiveComment(activeComment: ActiveComment | null): void {
    this.activeComment = activeComment;
  }
}
