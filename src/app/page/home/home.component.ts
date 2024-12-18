import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import { Game } from '../../shared/model/game.model';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  gameList: Game[] = [];

  constructor(private apiService: ApiService,private router: Router) { 

  }

  ngOnInit(): void {
    this.apiService.getGames().subscribe((games: Game[]) => {
      this.gameList = games;
    });
  }

  startGame(): void {
    this.router.navigate(['/game']); 
  }

}
