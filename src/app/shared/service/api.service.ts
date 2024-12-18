import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Player, PlayerApi, Score } from '../model/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) { }

  ping() {
    return this.http.get<{ping: string, ack: string}>(`${this.apiUrl}/ping`);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  postGame(score: Score[]) {
    return this.http.post<Score[]>(`${this.apiUrl}/games`, score);
  }

  getPlayers(): Observable<PlayerApi[]>  {
    return this.http.get<PlayerApi[]>(`${this.apiUrl}/players`);
  }

  postPlayer(player: {name: string}) : Observable<PlayerApi>{
    return this.http.post<PlayerApi>(`${this.apiUrl}/players`, player);
  }
}
