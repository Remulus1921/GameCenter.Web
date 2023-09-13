export interface CommentSmallDto {
  commentContent: string;
  parentId: string | null;
}

export interface CommentDto {
  id: string;
  commentContent: string;
  userName: string;
  creationDate: Date;
  modificationDate: Date;
  parentId: string | null;
}