import { CommentDto } from '../comment/commentDtos';
import { FileDto } from '../file/fileDtos';

export interface GameAddUpdateDto {
  name: string;
  gameType: string;
  description: string;
  studio: string;
  rating: string;
  capacity: number;
  platforms: string[];
}

export interface GameDto {
  id: string;
  name: string;
  gameType: string;
  description: string;
  studio: string;
  rating: string;
  capacity: number;
  platformsName: string[];
  image: FileDto;
  gameRates: number[];
  comments: CommentDto[];
}

export interface GameSmallDto {
  id: string;
  name: string;
  gameType: string;
  rating: string;
  image: FileDto;
}
