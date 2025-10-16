
export enum GameMode {
  BINGO75 = 75,
  BINGO90 = 90,
}

export enum Theme {
  CLASSIC = 'classic',
  RETRO = 'retro',
  MODERN = 'modern',
}

export interface GameState {
  isGameStarted: boolean;
  gameMode: GameMode;
  theme: Theme;
  drawnNumbers: number[];
  currentNumber: number | null;
  isDrawing: boolean;
  isBingo: boolean;
}
