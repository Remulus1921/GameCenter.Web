import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { createFileFromDto } from 'src/app/core/methods/file-methods';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { Game } from 'src/app/models/game/gameDtos';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  title = 'Gry';
  games: Game[] = [];
  selectedColumn: string = 'name';

  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<Game>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _gameService: GameService,
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getGameList();
    if (this.isInRole()) {
      this.displayedColumns = [
        'index',
        'title',
        'type',
        'platforms',
        'rating',
        'image',
        'details',
        'edit',
        'delete',
      ];
    } else {
      this.displayedColumns = [
        'index',
        'title',
        'type',
        'platforms',
        'rating',
        'image',
        'details',
      ];
    }
  }

  getGameList(): void {
    this._gameService.getGames().subscribe((games) => {
      this.games = [];
      this.games = games.map((game) => ({
        id: game.id,
        name: game.name,
        gameType: game.gameType,
        rating: game.rating,
        platforms: game.platforms,
        imageUrl: URL.createObjectURL(createFileFromDto(game.image)),
      }));
      this.dataSource = new MatTableDataSource(this.games);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteGame(id: string): void {
    this._gameService.deleteGame(id).subscribe(
      () => {
        this.toastr.warning('Usunięto grę', 'Stan gry');
        this.getGameList();
      },
      (error) => {
        this.toastr.error('Wystąpił błąd podczas usuwania gry', 'Stan gry');
      }
    );
  }

  isInRole(): boolean {
    return this.auth.isInRole() && this.auth.isLoggedIn();
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement) {
      const value = inputElement.value.trim().toLowerCase();
      this.dataSource.filter = value;
      if (this.dataSource.filterPredicate) {
        this.dataSource.filterPredicate = (data: Game, filter: string) => {
          if (this.selectedColumn !== 'platforms') {
            return data[this.selectedColumn].toLowerCase().includes(filter);
          } else {
            let isPlatform = false;
            data[this.selectedColumn].forEach((platform) => {
              if (platform.toLowerCase().includes(filter)) isPlatform = true;
            });
            return isPlatform;
          }
        };
      }
    }
  }
}
