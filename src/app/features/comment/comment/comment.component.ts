import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ActiveComment,
  ActiveCommentTypeEnum,
} from 'src/app/models/comment/activeComment';
import { CommentDto } from 'src/app/models/comment/commentDtos';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() currentUserEmail!: string;
  @Input() replies!: CommentDto[];
  @Input() activeComment!: ActiveComment | null;
  @Input() parentId: string | null = null;

  @Output() setActiveComment = new EventEmitter<ActiveComment | null>();
  @Output() addComment = new EventEmitter<{
    text: string;
    parentId: string | null;
  }>();

  @Output() updateComment = new EventEmitter<{
    text: string;
    commentId: string;
  }>();

  @Output() deleteComment = new EventEmitter<string>();

  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: string | null = null;

  @Input() comment!: CommentDto;

  ngOnInit(): void {
    this.canReply = Boolean(this.currentUserEmail);
    this.canEdit = this.currentUserEmail === this.comment.userEmail;
    this.canDelete = this.currentUserEmail === this.comment.userEmail;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }

    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }

    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.editing
    );
  }
}
