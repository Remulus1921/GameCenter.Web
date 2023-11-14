import { FileDto } from '../file/fileDtos';

export interface PostDto {
  title: string;
  content: string;
  created: Date;
  modified: Date;
  image: FileDto | null;
  userName: string;
  platforms: string[];
}

export interface PostAddUpdateDto {
  title: string;
  content: string;
  platforms: string[];
}

export interface PostSmallDto {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  image: FileDto | null;
  platforms: string[];
}

export interface Post {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  imageUrl: string | null;
  platforms: string[];
}
