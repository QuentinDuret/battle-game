import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameState, Score } from '../../shared/model/game.model';
import { ApiService } from '../../shared/service/api.service';
import { GameService } from '../../shared/service/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  gameState!: GameState;

  constructor(private apiService: ApiService, private gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameState = this.gameService.initializeGame({name :'Joueur 1', id: 1 }, {name :'Joueur 2', id: 2 });
  }

  playTurn(): void {
    this.gameState = this.gameService.playTurn(this.gameState);

    // Si le jeu est terminé, sauvegarder les résultats
    if (this.gameState.winner) {
      this.saveGameResult();
    }
  }

  saveGameResult(): void {
    const { players, winner } = this.gameState;
    let score: Score[] = [];
    score.push({ playerId: players[0].id, score: players[0].score });
    score.push({ playerId: players[1].id, score: players[1].score });
    this.apiService.postGame(score).subscribe(() => {
    });
  }

  restartGame(): void {
    this.startNewGame();
  }
}
