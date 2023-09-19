import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommentService } from "src/app/core/services/comment/comment.service";
import { GameService } from "src/app/core/services/game/game.service";
import { RateService } from "src/app/core/services/rate/rate.service";
import { CommentSmallDto } from "src/app/models/comment/commentDtos";
import { GameDto } from "src/app/models/game/gameDtos";
import { RateDto, RateSmallDto } from "src/app/models/rate/rateDtos";

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit{
  game: GameDto = {} as GameDto;
  id!: string;
  avarageRate: RateDto = {} as RateDto;
  userRate: RateSmallDto = {} as RateSmallDto;
  newComment: CommentSmallDto = {} as CommentSmallDto;
  rate: RateSmallDto = {} as RateSmallDto;

  constructor(
    private _gameService: GameService,
    private _rateService: RateService,
    private _commentService: CommentService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getGameDetails();
    this.getAvarageRate();
    this.getUserRate();
  }

  getGameDetails(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this._gameService.getGame(this.id).subscribe((game) => this.game = game);
  }

  getAvarageRate(): void {
    this._rateService.getGameAvarageRate(this.id).subscribe((avarageRate) => this.avarageRate = avarageRate);
  }

  getUserRate(): void {
    this._rateService.getUserRate(this.id).subscribe((rate) => this.userRate = rate);
  }

  addRate(): void {
    this._rateService.addRate(this.id, this.rate).subscribe(() => this.getUserRate());
  }

  updateRate(): void {
    this._rateService.updateRate(this.id, this.rate).subscribe(() => this.getUserRate());
  }

  addComment(): void {
    this._commentService.addComment(this.id, this.newComment).subscribe(() => this.getGameDetails());
  }

  editComment(comment: CommentSmallDto): void {
    this._commentService.updateComment(comment.id!, comment).subscribe(() => this.getGameDetails());
  }

  deleteComment(id: string): void {
    this._commentService.deleteComment(id).subscribe(() => this.getGameDetails());
  }
}
