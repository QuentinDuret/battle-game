import { NgFor, NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { GameState, Player, PlayerApi, Score } from '../../shared/model/game.model';
import { ApiService } from '../../shared/service/api.service';
import { GameService } from '../../shared/service/game.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  gameState!: GameState;

  players1: PlayerApi[] = [];
  players2: PlayerApi[] = [];
  allPlayers: PlayerApi[] = [];
  selectedPlayers: { player1: PlayerApi ; player2: PlayerApi  } = {
    player1: {name :'player 1', id: 1 },
    player2: {name :'player 2', id: 2 }
  };

  newPlayerName: string = '';
  gameStart: boolean  =false;
  private destroy$ = new Subject<void>(); 

  constructor(private apiService: ApiService, private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  availablePlayers(): void {
    this.players1 =  [...this.allPlayers.filter(player => 
      player !== this.selectedPlayers.player2
    )];
    this.players2 =  [...this.allPlayers.filter(player => 
      player !== this.selectedPlayers.player1
    )];

  }


  loadPlayers(): void {
    this.apiService.getPlayers().pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            console.error('Erreur lors de la récupération des joueurs:', error);
            return [];
          })
        ).subscribe((players: PlayerApi[]) => {
      this.allPlayers = players;
      this.availablePlayers();
     });
  }

  addNewPlayer() {
    this.apiService.postPlayer({name : this.newPlayerName} ).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error('Erreur lors de la récupération des joueurs:', error);
        return [];
      })
    ).subscribe((player: PlayerApi) => {
      this.allPlayers.push(player);
      this.availablePlayers();
     });
  }
  
  startNewGame(): void {
    this.gameStart = true;
    this.gameState = this.gameService.initializeGame(this.selectedPlayers.player1, this.selectedPlayers.player2);
  }

  playTurn(): void {
    this.gameState = this.gameService.playTurn(this.gameState);
    if (this.gameState.winner) {
      this.saveGameResult();
    }
  }

  saveGameResult(): void {
    const { players, winner } = this.gameState;
    let score: Score[] = [];
    score.push({ playerId: players[0].id, score: players[0].score });
    score.push({ playerId: players[1].id, score: players[1].score });
    this.apiService.postGame(score).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error('Erreur lors de la récupération des joueurs:', error);
        return [];
      })
    ).subscribe(() => {
    });
  }

  restartGame(): void {
    this.gameStart = false;
  }

  goToScores(): void {
    this.router.navigate(['/home']); 
  }
}
