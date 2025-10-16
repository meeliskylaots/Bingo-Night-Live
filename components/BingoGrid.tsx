
import React from 'react';
import { useGame } from '../hooks/useGameSync';
import { THEMES } from '../constants';

const BingoGrid: React.FC = () => {
    const { gameMode, drawnNumbers, theme } = useGame();
    const currentTheme = THEMES[theme];
    const drawnSet = new Set(drawnNumbers);

    const numbers = Array.from({ length: gameMode }, (_, i) => i + 1);

    const gridCols = gameMode === 90 ? 'grid-cols-10' : 'grid-cols-10 md:grid-cols-15';
    const gridTemplate = gameMode === 75 ? { gridTemplateColumns: 'repeat(15, minmax(0, 1fr))' } : {};

    return (
        <div className={`p-4 rounded-xl shadow-inner ${currentTheme.gridBg}`}>
            <div className={`grid gap-1.5 ${gameMode === 90 ? 'grid-cols-10' : 'grid-cols-15-custom'}`} style={gameMode === 75 ? {'--grid-cols': 15} as React.CSSProperties : {'--grid-cols': 10} as React.CSSProperties}>
                 <style>{`
                    .grid-cols-15-custom {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(2.5rem, 1fr));
                    }
                    @media (min-width: 640px) {
                        .grid-cols-15-custom {
                            grid-template-columns: repeat(15, minmax(0, 1fr));
                        }
                    }
                `}</style>
                {numbers.map(number => {
                    const isDrawn = drawnSet.has(number);
                    return (
                        <div
                            key={number}
                            className={`flex items-center justify-center aspect-square rounded-full text-sm sm:text-base font-bold transition-all duration-300
                                ${isDrawn 
                                    ? `${currentTheme.gridDrawnBg} ${currentTheme.gridDrawnText} transform scale-105 shadow-lg` 
                                    : `${currentTheme.gridText} bg-black/20`
                                }`}
                        >
                            {number}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BingoGrid;
