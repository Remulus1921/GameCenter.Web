import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { CommentService } from 'src/app/core/services/comment/comment.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { RateService } from 'src/app/core/services/rate/rate.service';
import { CommentSmallDto } from 'src/app/models/comment/commentDtos';
import { GameDto } from 'src/app/models/game/gameDtos';
import { RateDto, RateSmallDto } from 'src/app/models/rate/rateDtos';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  game: GameDto = {} as GameDto;
  id: string = String(this.route.snapshot.paramMap.get('id'));
  imageUrl!: string;
  avarageRate: RateDto = {} as RateDto;
  userRate: RateSmallDto = {} as RateSmallDto;
  newComment: CommentSmallDto = {} as CommentSmallDto;
  rate: RateSmallDto = {} as RateSmallDto;
  token: string | null = null;
  decodedToken: any;
  email: string = '';
  isEditing: boolean = false;
  originalRate: number | null = 0;

  constructor(
    private _gameService: GameService,
    private _rateService: RateService,
    private _commentService: CommentService,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getGameDetails();
    this.getAvarageRate();
    this.getUserRate();
    this.getUserEmail();
  }

  ngOnDestroy(): void {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  getGameDetails(): void {
    this._gameService.getGame(this.id).subscribe((game) => {
      this.game = game;
      this.imageUrl = URL.createObjectURL(createFileFromDto(game.image));
    });
  }

  getAvarageRate(): void {
    this._rateService
      .getGameAvarageRate(this.id)
      .subscribe((avarageRate) => (this.avarageRate = avarageRate));
  }

  getUserRate(): void {
    this._rateService
      .getUserRate(this.id)
      .subscribe((rate) => (this.userRate = rate));
  }

  addRate(): void {
    this._rateService.addRate(this.id, this.rate).subscribe(() => {
      this.getAvarageRate();
      this.getUserRate();
    });
  }

  updateRate(): void {
    this._rateService.updateRate(this.id, this.rate).subscribe(() => {
      this.getAvarageRate();
    });
  }

  editRate() {
    this.originalRate = this.userRate.gameRate;
    this.isEditing = true;
  }

  confirmChange() {
    this.userRate.gameRate = this.rate.gameRate;
    this.isEditing = false;
    this.updateRate();
    this.getAvarageRate();
  }

  cancelChange() {
    this.isEditing = false;
    this.rate.gameRate = this.originalRate;
  }

  getUserEmail(): void {
    this.token = localStorage.getItem('jwtToken');
    this.decodedToken = jwt_decode(this.token as string);
    this.email = this.decodedToken.email;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
