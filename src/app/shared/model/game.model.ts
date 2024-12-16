export interface Game {
    id: number,
    scores: Score[]
}

export interface Score {
    playerId: number,
    score: number
}