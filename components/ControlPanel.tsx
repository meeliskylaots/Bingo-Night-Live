
import React from 'react';
import { useGame } from '../hooks/useGameSync';
import BingoGrid from './BingoGrid';
import ThemeSelector from './ThemeSelector';
import ResetIcon from './icons/ResetIcon';
import TrophyIcon from './icons/TrophyIcon';
import UndoIcon from './icons/UndoIcon';
import { THEMES } from '../constants';

const ControlPanel: React.FC = () => {
    const { 
        drawNextNumber, 
        undoLastNumber, 
        triggerBingo, 
        resetGame,
        isDrawing,
        drawnNumbers,
        gameMode,
        currentNumber,
        theme
    } = useGame();
    
    const currentTheme = THEMES[theme];
    const drawnCount = drawnNumbers.length;
    const remainingCount = gameMode - drawnCount;

    return (
        <div className={`p-6 min-h-screen flex flex-col items-center ${currentTheme.text}`}>
            <h1 className="text-4xl font-bold mb-6 tracking-wide">Juhi Juhtpaneel</h1>
            
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Controls */}
                <div className="lg:col-span-1 bg-black/20 p-6 rounded-2xl shadow-lg flex flex-col space-y-4">
                    <h2 className="text-2xl font-semibold border-b-2 border-white/20 pb-2 mb-2">Tegevused</h2>
                    <button 
                        onClick={drawNextNumber} 
                        disabled={isDrawing || remainingCount === 0}
                        className={`w-full text-2xl font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-105 ${
                            isDrawing || remainingCount === 0 
                            ? 'bg-gray-500 cursor-not-allowed' 
                            : `${currentTheme.accent} text-black hover:opacity-90`
                        }`}
                    >
                        {isDrawing ? 'Loosib...' : 'Loosi Järgmine Number'}
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                           onClick={triggerBingo} 
                           className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                           <TrophyIcon />
                           <span>BINGO!</span>
                       </button>
                       <button 
                           onClick={undoLastNumber} 
                           disabled={drawnCount === 0}
                           className="flex items-center justify-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed">
                           <UndoIcon />
                           <span>Võta Tagasi</span>
                       </button>
                    </div>
                     <button 
                         onClick={resetGame} 
                         className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                         <ResetIcon />
                         <span>Taaskäivita Mäng</span>
                     </button>
                    
                    <div className="pt-4">
                        <h3 className="text-xl font-semibold mb-2">Kujundus</h3>
                        <ThemeSelector />
                    </div>
                </div>

                {/* Right Column: Info and Grid */}
                <div className="lg:col-span-2 bg-black/20 p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-around items-center mb-6 text-center">
                        <div>
                            <p className="text-lg opacity-80">Viimane Number</p>
                            <p className="text-5xl font-bold">{currentNumber ?? '-'}</p>
                        </div>
                        <div>
                            <p className="text-lg opacity-80">Loositud Numbreid</p>
                            <p className="text-5xl font-bold">{drawnCount} / {gameMode}</p>
                        </div>
                        <div>
                             <p className="text-lg opacity-80">Alles Jäänud</p>
                            <p className="text-5xl font-bold">{remainingCount}</p>
                        </div>
                    </div>
                    <BingoGrid />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
