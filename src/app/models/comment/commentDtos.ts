export interface CommentSmallDto {
  id: string | null;
  commentContent: string;
  parentId: string | null;
}

export interface CommentDto {
  id: string;
  commentContent: string;
  userName: string;
  userEmail: string;
  creationDate: Date;
  modificationDate: Date;
  parentId: string | null;
}
