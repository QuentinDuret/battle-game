import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { Game, Player, PlayerApi } from '../../shared/model/game.model';
import { NgFor, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  gameList: Game[] = [];
  players: PlayerApi[] = [];
  animationDuration = 10;
  private destroy$ = new Subject<void>(); 
  constructor(private apiService: ApiService,private router: Router) { 

  }

  ngOnInit(): void {
    
    this.apiService.getGames().pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error('Erreur lors de la récupération des jeux:', error);
        return [];
      })
    ).subscribe((games: Game[]) => {
      this.gameList = games.slice().reverse();
    });

    // Abonnement pour récupérer les joueurs avec gestion des erreurs et annulation des abonnements à la destruction
    this.apiService.getPlayers().pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error('Erreur lors de la récupération des joueurs:', error);
        return [];
      })
    ).subscribe((players: PlayerApi[]) => {
      this.players = players;
      this.updateAnimationDuration();
      this.calculateScrollDistance();
    });
  }

  startGame(): void {
    this.router.navigate(['/game']); 
  }

  getPlayerNameById(id: number): string | null {
    const player = this.players.find(player => player.id === id);
    return player ? player.name : null;
  }

  updateAnimationDuration(): void {
    const totalScores = this.players.length;
    const baseDuration = 10; 
    this.animationDuration = baseDuration + (totalScores  * 2.5); 
  }

  calculateScrollDistance(): void {
    const itemHeight = 100; 
    const totalItems = this.players.length ;
    const totalHeight = itemHeight * totalItems;
    this.setScrollDistance(totalHeight);
  }

  setScrollDistance(distance: number): void {
    const root = document.documentElement;
    root.style.setProperty('--translate-distance', `-${distance}px`);
  }

}
