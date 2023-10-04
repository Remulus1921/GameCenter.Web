export interface PostDto {
  title: string;
  content: string;
  created: Date;
  modified: Date;
  image: File | null;
  userName: string;
  platforms: string[];
}

export interface PostAddUpdateDto {
  title: string;
  content: string;
  image: File | null;
  platforms: string[];
}

export interface PostSmallDto {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  image: File | null;
  platforms: string[];
}
