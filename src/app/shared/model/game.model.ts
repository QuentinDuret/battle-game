export interface Game {
    id: number,
    scores: Score[]
}

export interface Score {
    playerId: number,
    score: number
}

export interface Player {
    name: string;
    id: number;
    deck: number[]; 
    score: number; 
}

export interface GameState {
    players: Player[];
    currentTurn: number;
    playedCards: number[]; 
    winner?: string; 
}

