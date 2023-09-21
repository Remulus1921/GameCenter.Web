export enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing,'
}
export interface ActiveComment {
  id: string;
  type: ActiveCommentTypeEnum;
}
