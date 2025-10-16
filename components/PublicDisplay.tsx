import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/useGameSync';
import BingoGrid from './BingoGrid';
import { THEMES } from '../constants';
import Confetti from './Confetti';

const AnimatedBall: React.FC = () => {
    const { isDrawing, currentNumber, theme } = useGame();
    const [displayNumber, setDisplayNumber] = useState<number | string | null>('?');
    const currentTheme = THEMES[theme];

    useEffect(() => {
        if (isDrawing) {
            const interval = setInterval(() => {
                setDisplayNumber(Math.floor(Math.random() * 90) + 1);
            }, 50);
            return () => clearInterval(interval);
        } else {
            setDisplayNumber(currentNumber);
        }
    }, [isDrawing, currentNumber]);

    return (
        <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center [perspective:1000px]">
             <div 
                className={`absolute w-full h-full rounded-full ${currentTheme.ballBg} shadow-2xl flex items-center justify-center transition-transform duration-500 [transform-style:preserve-3d] ${isDrawing ? 'animate-spin-y-fast' : ''}`}
             >
                <span className={`text-8xl md:text-9xl font-black ${currentTheme.ballText} [transform:translateZ(100px)]`}>
                    {displayNumber}
                </span>
            </div>
            {!isDrawing && currentNumber && (
                 <div key={currentNumber} className={`absolute w-full h-full rounded-full ${currentTheme.ballBg} animate-flash`}></div>
            )}
        </div>
    );
}


const PublicDisplay: React.FC = () => {
    const { isGameStarted, theme, isBingo, drawnNumbers, gameMode } = useGame();
    const currentTheme = THEMES[theme];

    if (!isGameStarted) {
        return (
            <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 text-center ${currentTheme.bg} ${currentTheme.text}`}>
                <h1 className="text-5xl font-bold" style={{fontFamily: "'Arial Black', Gadget, sans-serif"}}>BINGO NIGHT LIVE</h1>
                <p className="mt-4 text-2xl opacity-90 animate-pulse">Ootan mängu algust...</p>
                <p className="mt-2 text-lg opacity-70">Ekraan uueneb automaatselt, kui mängujuht alustab.</p>
            </div>
        );
    }

    return (
        <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden ${currentTheme.text}`}>
            {isBingo && <Confetti />}
            <div className="w-full flex-grow flex flex-col lg:flex-row items-center justify-center gap-8">
                <div className="flex-shrink-0 flex flex-col items-center justify-center">
                    <p className="text-2xl md:text-3xl font-semibold mb-4 opacity-80 tracking-wider">VIIMANE NUMBER</p>
                    <AnimatedBall />
                    <div className="text-center mt-6">
                        <p className="text-xl opacity-80">Loositud</p>
                        <p className="text-6xl font-bold">{drawnNumbers.length}<span className="text-3xl opacity-70"> / {gameMode}</span></p>
                    </div>
                </div>
                <div className="w-full lg:w-auto lg:max-w-2xl flex-grow-0">
                    <BingoGrid />
                </div>
            </div>
        </div>
    );
};

export default PublicDisplay;