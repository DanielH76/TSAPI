// bigredBackend/lib/modules

export interface Game {
  gameId: string;
  highscore: number;
  avgTime: number;
  numClicks: number;
  playerId: string;
  bestTime: number;
}

export interface Player {
  playerId: string;
  username: string;
}
