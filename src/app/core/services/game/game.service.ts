import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDto, GameSmallDto } from 'src/app/models/game/gameDtos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameUrl: string = 'Games';

  constructor(private http: HttpClient) {}

  getGames(): Observable<GameSmallDto[]> {
    return this.http.get<GameSmallDto[]>(
      `${environment.apiUrl}/${this.gameUrl}`
    );
  }

  getGame(id: string): Observable<GameDto> {
    return this.http.get<GameDto>(
      `${environment.apiUrl}/${this.gameUrl}/${id}`
    );
  }

  addGame(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(
      `${environment.apiUrl}/${this.gameUrl}/addGame`,
      formData,
      { headers, responseType: 'text' }
    );
  }

  updateGame(id: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Accept: 'text/plain',
    });

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.put(
      `${environment.apiUrl}/${this.gameUrl}/${id}`,
      formData,
      {
        headers,
        responseType: 'text',
      }
    );
  }

  deleteGame(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.gameUrl}/${id}`);
  }
}
