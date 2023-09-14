export interface PostDto {
  title: string;
  content: string;
  created: Date;
  modified: Date;
  imagePath: string | null;
  userName: string;
  platforms: string[];
}

export interface PostAddUpdateDto {
  title: string;
  content: string;
  imagePath: string | null;
  platforms: string[];
}

export interface PostSmallDto {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  imagePath: string | null;
  platforms: string[];
}
