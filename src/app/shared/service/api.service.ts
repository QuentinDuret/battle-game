import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game, Score } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = '/api/v1';

  constructor(private http: HttpClient) { }

  ping() {
    return this.http.get<{ping: string, ack: string}>(`${this.apiUrl}/ping`);
  }

  getGames() {
    return this.http.get<Game[]>(`${this.apiUrl}/games`);
  }

  postGame(score: Score[]) {
    return this.http.post<any>(`${this.apiUrl}/games`, score);
  }
}
