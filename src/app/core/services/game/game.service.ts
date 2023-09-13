import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GameAddUpdateDto, GameDto, GameSmallDto } from "src/app/models/game/gameDtos";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameUrl: string = "Games";

  constructor(private http: HttpClient) { }

  getGames(): Observable<GameSmallDto[]> {
    return this.http.get<GameSmallDto[]>(`${environment.apiUrl}/${this.gameUrl}`);
  }

  getGame(id: string): Observable<GameDto> {
    return this.http.get<GameDto>(`${environment.apiUrl}/${this.gameUrl}/${id}`);
  }

  addGame(game: GameAddUpdateDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.gameUrl}/addGame`, game);
  }

  updateGame(id: string, game: GameAddUpdateDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.gameUrl}/${id}`, game);
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.gameUrl}/${id}`);
  }
}
