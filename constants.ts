
import { Theme } from './types';

type ThemePalette = {
  bg: string;
  text: string;
  gridBg: string;
  gridText: string;
  gridDrawnBg: string;
  gridDrawnText: string;
  ballBg: string;
  ballText: string;
  accent: string;
};

export const THEMES: Record<Theme, ThemePalette> = {
  [Theme.CLASSIC]: {
    bg: 'bg-gradient-to-br from-red-800 to-red-900',
    text: 'text-yellow-200',
    gridBg: 'bg-white/10',
    gridText: 'text-white',
    gridDrawnBg: 'bg-yellow-400',
    gridDrawnText: 'text-red-900',
    ballBg: 'bg-white',
    ballText: 'text-red-800',
    accent: 'bg-yellow-400',
  },
  [Theme.RETRO]: {
    bg: 'bg-gradient-to-br from-teal-500 to-purple-600',
    text: 'text-pink-200',
    gridBg: 'bg-black/20',
    gridText: 'text-white',
    gridDrawnBg: 'bg-pink-400',
    gridDrawnText: 'text-black',
    ballBg: 'bg-gray-200',
    ballText: 'text-teal-700',
    accent: 'bg-pink-400',
  },
  [Theme.MODERN]: {
    bg: 'bg-gray-900',
    text: 'text-cyan-300',
    gridBg: 'bg-gray-800/50',
    gridText: 'text-gray-300',
    gridDrawnBg: 'bg-cyan-400',
    gridDrawnText: 'text-gray-900',
    ballBg: 'bg-gray-700',
    ballText: 'text-white',
    accent: 'bg-cyan-400',
  },
};

export const NUMBER_TO_ESTONIAN: { [key: number]: string } = {
  1: 'üks', 2: 'kaks', 3: 'kolm', 4: 'neli', 5: 'viis', 6: 'kuus', 7: 'seitse', 8: 'kaheksa', 9: 'üheksa', 10: 'kümme',
  11: 'üksteist', 12: 'kaksteist', 13: 'kolmteist', 14: 'neliteist', 15: 'viisteist', 16: 'kuusteist', 17: 'seitseteist', 18: 'kaheksateist', 19: 'üheksateist',
  20: 'kakskümmend', 21: 'kakskümmend üks', 22: 'kakskümmend kaks', 23: 'kakskümmend kolm', 24: 'kakskümmend neli', 25: 'kakskümmend viis', 26: 'kakskümmend kuus', 27: 'kakskümmend seitse', 28: 'kakskümmend kaheksa', 29: 'kakskümmend üheksa',
  30: 'kolmkümmend', 31: 'kolmkümmend üks', 32: 'kolmkümmend kaks', 33: 'kolmkümmend kolm', 34: 'kolmkümmend neli', 35: 'kolmkümmend viis', 36: 'kolmkümmend kuus', 37: 'kolmkümmend seitse', 38: 'kolmkümmend kaheksa', 39: 'kolmkümmend üheksa',
  40: 'nelikümmend', 41: 'nelikümmend üks', 42: 'nelikümmend kaks', 43: 'nelikümmend kolm', 44: 'nelikümmend neli', 45: 'nelikümmend viis', 46: 'nelikümmend kuus', 47: 'nelikümmend seitse', 48: 'nelikümmend kaheksa', 49: 'nelikümmend üheksa',
  50: 'viiskümmend', 51: 'viiskümmend üks', 52: 'viiskümmend kaks', 53: 'viiskümmend kolm', 54: 'viiskümmend neli', 55: 'viiskümmend viis', 56: 'viiskümmend kuus', 57: 'viiskümmend seitse', 58: 'viiskümmend kaheksa', 59: 'viiskümmend üheksa',
  60: 'kuuskümmend', 61: 'kuuskümmend üks', 62: 'kuuskümmend kaks', 63: 'kuuskümmend kolm', 64: 'kuuskümmend neli', 65: 'kuuskümmend viis', 66: 'kuuskümmend kuus', 67: 'kuuskümmend seitse', 68: 'kuuskümmend kaheksa', 69: 'kuuskümmend üheksa',
  70: 'seitsekümmend', 71: 'seitsekümmend üks', 72: 'seitsekümmend kaks', 73: 'seitsekümmend kolm', 74: 'seitsekümmend neli', 75: 'seitsekümmend viis', 76: 'seitsekümmend kuus', 77: 'seitsekümmend seitse', 78: 'seitsekümmend kaheksa', 79: 'seitsekümmend üheksa',
  80: 'kaheksakümmend', 81: 'kaheksakümmend üks', 82: 'kaheksakümmend kaks', 83: 'kaheksakümmend kolm', 84: 'kaheksakümmend neli', 85: 'kaheksakümmend viis', 86: 'kaheksakümmend kuus', 87: 'kaheksakümmend seitse', 88: 'kaheksakümmend kaheksa', 89: 'kaheksakümmend üheksa',
  90: 'üheksakümmend'
};

// Placeholder sound file paths. User should replace these with actual files.
export const SOUNDS = {
    DRUMROLL: '/sounds/drumroll.mp3', // Replace with actual sound file
    REVEAL: '/sounds/reveal.mp3',   // Replace with actual sound file
    BINGO: '/sounds/bingo.mp3',       // Replace with actual sound file
};
