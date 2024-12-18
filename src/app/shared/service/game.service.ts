import { Injectable } from '@angular/core';
import { GameState, PlayerApi } from '../model/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  initializeGame(player1 : PlayerApi, player2: PlayerApi): GameState {
    const deck = this.shuffleDeck(Array.from({ length: 52 }, (_, i) => i + 1));
    const mid = Math.floor(deck.length / 2);
    return {
      players: [
        { name: player1.name, id: player1.id, deck: deck.slice(0, mid), score: 0 },
        { name: player2.name, id: player2.id, deck: deck.slice(mid), score: 0 },
      ],
      currentTurn: 0,
      playedCards: [],
    };
  }

  shuffleDeck(deck: number[]): number[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  playTurn(gameState: GameState): GameState {
    const [player1, player2] = gameState.players;
  
    if (player1.deck.length === 0 || player2.deck.length === 0) {
      gameState.winner =
        player1.score > player2.score
          ? player1.name
          : player2.score > player1.score
          ? player2.name
          : "Égalité";
      return gameState;
    }
  
    const card1 = player1.deck.shift()!;
    const card2 = player2.deck.shift()!;
  
    gameState.playedCards = [card1, card2];
    if (card1 > card2) {
      player1.score++;
    } else if (card2 > card1) {
      player2.score++;
    }
    gameState.currentTurn++;
    return gameState;
  }
}
