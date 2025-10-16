import React, { useState, useEffect, useCallback, useContext, createContext, ReactNode } from 'react';
import { GameMode, GameState, Theme } from '../types';
import { speak } from '../services/speechService';
import { SOUNDS } from '../constants';

const LOCAL_STORAGE_KEY = 'bingoGameState';

const defaultState: GameState = {
    isGameStarted: false,
    gameMode: GameMode.BINGO75,
    theme: Theme.CLASSIC,
    drawnNumbers: [],
    currentNumber: null,
    isDrawing: false,
    isBingo: false,
};

// A simple utility to play sounds
const playSound = (src: string) => {
    // In a real app, you would have audio files in a public/sounds folder.
    // This functionality is mocked as we can't bundle assets.
    console.log(`Playing sound: ${src}`);
    // try {
    //   new Audio(src).play();
    // } catch (e) {
    //   console.error("Could not play audio. User interaction might be required.", e);
    // }
};

interface GameContextType extends GameState {
    startGame: (mode: GameMode) => void;
    drawNextNumber: () => void;
    undoLastNumber: () => void;
    triggerBingo: () => void;
    resetGame: () => void;
    changeTheme: (theme: Theme) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>(() => {
        try {
            const storedState = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedState ? JSON.parse(storedState) : defaultState;
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return defaultState;
        }
    });

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
                try {
                    setState(JSON.parse(event.newValue));
                } catch (error) {
                    console.error("Error parsing stored state", error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateState = useCallback((newState: Partial<GameState>) => {
        setState(prevState => {
            const updatedState = { ...prevState, ...newState };
            try {
                window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
            } catch (error) {
                console.error("Error writing to localStorage", error);
            }
            return updatedState;
        });
    }, []);

    const startGame = (mode: GameMode) => {
        updateState({ ...defaultState, isGameStarted: true, gameMode: mode });
    };

    const drawNextNumber = useCallback(() => {
        if (state.isDrawing) return;

        const allNumbers = Array.from({ length: state.gameMode }, (_, i) => i + 1);
        const availableNumbers = allNumbers.filter(n => !state.drawnNumbers.includes(n));

        if (availableNumbers.length === 0) return;
        
        playSound(SOUNDS.DRUMROLL);
        updateState({ isDrawing: true, isBingo: false, currentNumber: null });

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * availableNumbers.length);
            const newNumber = availableNumbers[randomIndex];
            
            playSound(SOUNDS.REVEAL);
            speak(newNumber);

            updateState({
                isDrawing: false,
                currentNumber: newNumber,
                drawnNumbers: [...state.drawnNumbers, newNumber],
            });
        }, 2000); // Animation duration
    }, [state.isDrawing, state.gameMode, state.drawnNumbers, updateState]);

    const undoLastNumber = () => {
        if (state.drawnNumbers.length === 0) return;
        const newDrawnNumbers = [...state.drawnNumbers];
        newDrawnNumbers.pop();
        updateState({
            drawnNumbers: newDrawnNumbers,
            currentNumber: newDrawnNumbers.length > 0 ? newDrawnNumbers[newDrawnNumbers.length - 1] : null,
            isBingo: false,
        });
    };

    const triggerBingo = () => {
        playSound(SOUNDS.BINGO);
        updateState({ isBingo: true });
        setTimeout(() => updateState({ isBingo: false }), 5000); // Confetti duration
    };

    const resetGame = () => {
        updateState(defaultState);
    };

    const changeTheme = (theme: Theme) => {
        updateState({ theme });
    };
    
    // FIX: Replaced JSX with React.createElement to allow a React component to be returned
    // from a .ts file without causing TSX parsing errors. This resolves all reported errors.
    return React.createElement(
        GameContext.Provider,
        {
            value: {
                ...state,
                startGame,
                drawNextNumber,
                undoLastNumber,
                triggerBingo,
                resetGame,
                changeTheme
            }
        },
        children
    );
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
