import { CommentDto } from "../comment/commentDtos";

export interface GameAddUpdateDto {
  name: string;
  gameType: string;
  description: string;
  studio: string;
  rating: string;
  capacity: number;
  imagePath: string;
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
  imagePath: string;
  platformsName: string[];
  gameRates: number[];
  comments: CommentDto[];
}

export interface GameSmallDto {
  id: string;
  name: string;
  gameType: string;
  rating: string;
  imagePath: string;
}
