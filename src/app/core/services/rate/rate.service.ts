import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RateDto, RateSmallDto } from "src/app/models/rate/rateDtos";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RateService {
  rateUrl = "Rates"

  constructor(private http: HttpClient) { }

  getGameAvarageRate(gameId: string): Observable<RateDto> {
    return this.http.get<RateDto>(`${environment.apiUrl}/${this.rateUrl}/gameRate/${gameId}`);
  }

  getUserRate(gameId: string): Observable<RateSmallDto> {
    return this.http.get<RateSmallDto>(`${environment.apiUrl}/${this.rateUrl}/userRate/${gameId}`);
  }

  addRate(gameId: string, rate: RateSmallDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.rateUrl}/addRate/${gameId}`, rate, {responseType: 'text'});
  }

  updateRate(gameId: string, rate: RateSmallDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.rateUrl}/updateRate/${gameId}`, rate, {responseType: 'text'});
  }

  deleteRate(gameId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.rateUrl}/removeRate/${gameId}`, {responseType: 'text'});
  }
}
