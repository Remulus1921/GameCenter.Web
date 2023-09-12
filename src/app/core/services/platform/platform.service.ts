import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PlatformDto } from "src/app/models/platform/platformDto";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  platformUrl = "Platforms"

  constructor(private http: HttpClient) { }

  getPlatforms(): Observable<PlatformDto[]> {
    return this.http.get<PlatformDto[]>(`${environment.apiUrl}/${this.platformUrl}`);
  }

  getSinglePlatform(platformId: string): Observable<PlatformDto> {
    return this.http.get<PlatformDto>(`${environment.apiUrl}/${this.platformUrl}/${platformId}`)
  }

  addPlatform(platform: PlatformDto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.platformUrl}`, platform);
  }

  deletePlatform(platform: PlatformDto): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.platformUrl}`, {body: platform});
  }

  updatePlatform(platform: PlatformDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.platformUrl}/update-platform`, platform);
  }
}
